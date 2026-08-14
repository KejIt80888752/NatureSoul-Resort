const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const PDFDocument = require("pdfkit");

// Email is optional: without EMAIL_USER / EMAIL_PASS the site still takes
// bookings, it just does not send the confirmation mail.
const mailEnabled = () => Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

let transporter = null;

if (mailEnabled()) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter
    .verify()
    .then(() => console.log("SMTP ready"))
    .catch((err) => console.error("SMTP error:", err.message));
} else {
  console.log("SMTP not configured — confirmation emails are disabled");
}

const generatePDFBuffer = (booking) =>
  new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    const total = Number(booking.price) + Number(booking.extraCharges || 0);

    doc.fontSize(20).text("Nature Soul Resort", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text("Booking Confirmation", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(12);
    doc.text(`Booking ID: ${booking.id}`);
    doc.text(`Guest Name: ${booking.customerName}`);
    doc.text(`Room: ${booking.roomName}`);
    doc.text(`Check-in: ${booking.checkIn} ${booking.checkInTime || ""}`);
    doc.text(`Check-out: ${booking.checkOut} ${booking.checkOutTime || ""}`);
    doc.moveDown();
    doc.text(`Room Price: Rs. ${booking.price}`);
    doc.moveDown();
    doc.font("Helvetica-Bold").text(`Total Amount: Rs. ${total}`);

    doc.end();
  });

exports.mailEnabled = mailEnabled;

exports.sendBookingMail = async (to, booking) => {
  if (!mailEnabled()) return;

  const pdfBuffer = await generatePDFBuffer(booking);
  await booking.update({ invoice_pdf: pdfBuffer });

  const templatePath = path.join(__dirname, "../templates/bookingEmail.hbs");
  const template = handlebars.compile(fs.readFileSync(templatePath, "utf8"));

  const html = template({
    name: booking.customerName,
    roomName: booking.roomName,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    checkInTime: booking.checkInTime,
    checkOutTime: booking.checkOutTime,
    price: booking.price,
    total: Number(booking.price),
  });

  await transporter.sendMail({
    from: `"Nature Soul Resort" <${process.env.EMAIL_USER}>`,
    to,
    bcc: process.env.OWNER_EMAIL || undefined, // resort's own copy of every booking
    subject: "Booking Confirmation - Nature Soul Resort",
    html,
    attachments: [{ filename: `booking-${booking.id}.pdf`, content: pdfBuffer }],
  });

  console.log(`Confirmation mail sent for booking ${booking.id}`);
};
