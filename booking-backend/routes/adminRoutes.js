const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const Room = require("../models/Room");
const Booking = require("../models/Booking");
const RoomBlock = require("../models/RoomBlock");
const adminAuth = require("../middlewares/adminAuth");
const { blockOverlapWhere, addDays, todayLocal } = require("../utils/availability");

router.use(adminAuth);

/**
 * GET /api/admin/calendar?from=2026-08-22&days=14
 * One row per room with a day-by-day status: free | booked | blocked
 */
router.get("/calendar", async (req, res) => {
  try {
    const from = req.query.from || todayLocal();
    const days = Math.min(Number(req.query.days) || 14, 60);
    const to = addDays(from, days);

    const [rooms, bookings, blocks] = await Promise.all([
      Room.findAll({ where: { isActive: true }, order: [["id", "ASC"]] }),
      Booking.findAll({
        where: {
          status: "confirmed",
          checkIn: { [Op.lt]: to },
          checkOut: { [Op.gt]: from },
        },
      }),
      RoomBlock.findAll({ where: blockOverlapWhere(from, to) }),
    ]);

    const dates = Array.from({ length: days }, (_, i) => addDays(from, i));

    const calendar = rooms.map((room) => ({
      roomId: room.id,
      name: room.name,
      price: room.price,
      days: dates.map((date) => {
        const booking = bookings.find(
          (b) => b.roomId === room.id && b.checkIn <= date && b.checkOut > date
        );
        if (booking) {
          return {
            date,
            status: "booked",
            guest: booking.customerName,
            bookingId: booking.id,
          };
        }

        const block = blocks.find(
          (b) => b.roomId === room.id && b.from <= date && b.to > date
        );
        if (block) {
          return { date, status: "blocked", reason: block.reason, blockId: block.id };
        }

        return { date, status: "free" };
      }),
    }));

    res.json({ from, to, dates, calendar });
  } catch (error) {
    console.error("CALENDAR ERROR:", error);
    res.status(500).json({ message: "Could not build calendar" });
  }
});

/**
 * POST /api/admin/blocks  { roomId, from, to, reason }
 * Blocks a date range so no OTA or website guest can take it.
 */
router.post("/blocks", async (req, res) => {
  try {
    const { roomId, from, to, reason } = req.body;

    if (!roomId || !from || !to || to <= from) {
      return res.status(400).json({ message: "roomId, from and to (after from) are required" });
    }

    const clash = await Booking.count({
      where: {
        roomId,
        status: "confirmed",
        checkIn: { [Op.lt]: to },
        checkOut: { [Op.gt]: from },
      },
    });

    if (clash > 0) {
      return res.status(409).json({ message: "There is already a guest booking in those dates" });
    }

    const block = await RoomBlock.create({ roomId, from, to, reason: reason || "Blocked" });
    res.status(201).json(block);
  } catch (error) {
    console.error("BLOCK ERROR:", error);
    res.status(500).json({ message: "Could not block those dates" });
  }
});

router.delete("/blocks/:id", async (req, res) => {
  try {
    const removed = await RoomBlock.destroy({ where: { id: req.params.id } });
    if (!removed) return res.status(404).json({ message: "Block not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("UNBLOCK ERROR:", error);
    res.status(500).json({ message: "Could not remove the block" });
  }
});

/**
 * PUT /api/admin/rooms/:id  { price, img, desc, maxOccupancy, isActive }
 * Rate and photo changes for the resort's own website.
 */
router.put("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const allowed = ["price", "img", "desc", "maxOccupancy", "beds", "ac", "isActive"];
    const updates = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (updates.price !== undefined) {
      const price = Number(updates.price);
      if (!Number.isFinite(price) || price <= 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
      }
      updates.price = Math.round(price);
    }

    await room.update(updates);
    res.json(room);
  } catch (error) {
    console.error("ROOM UPDATE ERROR:", error);
    res.status(500).json({ message: "Could not update the room" });
  }
});

/**
 * GET /api/admin/bookings — newest first, used by the dashboard
 */
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ["roomImage", "invoice_pdf"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    console.error("ADMIN BOOKINGS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;
