const sequelize = require("../config/db");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const { overlapWhere } = require("../utils/availability");
const { sendBookingMail, mailEnabled } = require("../utils/sendMail");
const { verifyCaptcha } = require("../utils/captcha");

const nameRegex = /^[A-Za-z\s.]{2,60}$/;
const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const aadhaarRegex = /^[0-9]{12}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// The browser can be bypassed, so every rule the form enforces is checked again here.
function validate(body) {
  const errors = [];

  if (!nameRegex.test(body.customerName || "")) errors.push("Enter a valid name");
  if (!phoneRegex.test(body.phone || "")) errors.push("Phone must be 10 digits");
  if (!emailRegex.test(body.email || "")) errors.push("Enter a valid email");

  if (!dateRegex.test(body.checkIn || "")) errors.push("Check-in date is required");
  if (!dateRegex.test(body.checkOut || "")) errors.push("Check-out date is required");

  if (dateRegex.test(body.checkIn || "") && dateRegex.test(body.checkOut || "")) {
    if (body.checkOut <= body.checkIn) errors.push("Check-out must be after check-in");

    const today = new Date().toISOString().split("T")[0];
    if (body.checkIn < today) errors.push("Check-in cannot be in the past");
  }

  const idType = (body.identityType || "").toLowerCase();
  if (idType === "aadhaar") {
    if (!aadhaarRegex.test(body.identityNumber || "")) errors.push("Aadhaar must be 12 digits");
  } else if (idType === "pan") {
    if (!panRegex.test((body.identityNumber || "").toUpperCase()))
      errors.push("PAN format is invalid");
  } else {
    errors.push("Select Aadhaar or PAN as identity proof");
  }

  return errors;
}

exports.createBooking = async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const captcha = await verifyCaptcha(req.body.captchaToken, req.ip);
    if (!captcha.ok) {
      return res.status(400).json({ success: false, errors: ["Captcha verification failed"] });
    }

    const room = await Room.findByPk(req.body.roomId);
    if (!room || !room.isActive) {
      return res.status(404).json({ success: false, errors: ["Room not found"] });
    }

    const { checkIn, checkOut } = req.body;

    // Booking + clash check inside one transaction, so two people submitting at the
    // same second cannot both grab the room.
    const booking = await sequelize.transaction(async (t) => {
      const clash = await Booking.count({
        where: overlapWhere(room.id, checkIn, checkOut),
        transaction: t,
        lock: t.LOCK ? t.LOCK.UPDATE : undefined,
      });

      if (clash > 0) {
        const error = new Error("ROOM_TAKEN");
        error.code = "ROOM_TAKEN";
        throw error;
      }

      return Booking.create(
        {
          roomId: room.id,
          roomName: room.name,
          price: String(room.price), // price comes from the database, never from the browser
          customerName: req.body.customerName.trim(),
          phone: req.body.phone,
          email: req.body.email.trim(),
          checkIn,
          checkOut,
          checkInTime: req.body.checkInTime || "",
          checkOutTime: req.body.checkOutTime || "",
          identityType: req.body.identityType,
          identityNumber: req.body.identityNumber,
          extraGuests: Number(req.body.extraGuests) || 0,
          children: Number(req.body.children) || 0,
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        roomName: booking.roomName,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      },
      emailSent: mailEnabled(),
    });

    // Everything below runs after the guest already has their confirmation.
    if (req.file) {
      booking
        .update({ roomImage: req.file.buffer })
        .catch((err) => console.error("Image save failed:", err.message));
    }

    if (mailEnabled()) {
      sendBookingMail(booking.email, booking).catch((err) =>
        console.error("Email failed:", err.message)
      );
    }
  } catch (error) {
    if (error.code === "ROOM_TAKEN") {
      return res.status(409).json({
        success: false,
        errors: ["Sorry, this room was just booked for those dates. Please pick other dates."],
      });
    }

    console.error("BOOKING ERROR:", error);
    res.status(500).json({ success: false, errors: ["Booking failed, please try again"] });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ["roomImage", "invoice_pdf"] },
      order: [["createdAt", "DESC"]],
      limit: Number(req.query.limit) || 200,
    });
    res.json(bookings);
  } catch (error) {
    console.error("FETCH BOOKINGS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking || !booking.invoice_pdf) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=booking-${booking.id}.pdf`);
    res.send(booking.invoice_pdf);
  } catch (error) {
    console.error("INVOICE ERROR:", error);
    res.status(500).json({ message: "Error downloading invoice" });
  }
};
