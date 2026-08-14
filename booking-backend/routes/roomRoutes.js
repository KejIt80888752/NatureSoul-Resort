const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { bookedRoomIdsToday, bookedRoomIdsBetween } = require("../utils/availability");

// GET /api/rooms                       → every room, marked free/occupied today
// GET /api/rooms?checkIn=&checkOut=    → availability for those dates
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
