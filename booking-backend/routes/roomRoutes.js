const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { bookedRoomIdsToday, bookedRoomIdsBetween } = require("../utils/availability");

// GET /api/rooms                       → every room, marked free/occupied today
// GET /api/rooms?checkIn=&checkOut=    → availability for those dates
// GET /api/rooms/:id/photo — the uploaded photo for one room
router.get("/:id/photo", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room || !room.photo) return res.status(404).end();

    res.setHeader("Content-Type", room.photoType || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=300"); // 5 min, so updates show up quickly
    res.send(room.photo);
  } catch (error) {
    console.error("ROOM PHOTO ERROR:", error);
    res.status(500).end();
  }
});

router.get("/", async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    const rooms = await Room.findAll({
      where: { isActive: true },
      order: [["id", "ASC"]],
    });

    const busy =
      checkIn && checkOut
        ? await bookedRoomIdsBetween(checkIn, checkOut)
        : await bookedRoomIdsToday();

    res.json(
      rooms.map((room) => ({
        id: room.id,
        name: room.name,
        type: room.type,
        units: 1,
        beds: room.beds,
        ac: room.ac,
        amenities: room.amenities,
        // an uploaded photo wins over a pasted URL
        photoUrl: room.photo ? `/api/rooms/${room.id}/photo?v=${new Date(room.photoUpdatedAt).getTime()}` : null,
        price: room.price,
        maxOccupancy: room.maxOccupancy, // guest capacity — used by the site filter
        available: !busy.has(room.id),
        img: room.img,
        desc: room.desc,
      }))
    );
  } catch (error) {
    console.error("ROOM ROUTE ERROR:", error);
    res.status(500).json({ error: "Could not load rooms" });
  }
});

module.exports = router;
