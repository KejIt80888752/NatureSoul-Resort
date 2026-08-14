const { Op } = require("sequelize");
const Booking = require("../models/Booking");

// Two stays clash when one starts before the other ends:
//   existing.checkIn < requested.checkOut  AND  existing.checkOut > requested.checkIn
// Same-day turnover (one guest checks out, next checks in) is allowed.
const overlapWhere = (roomId, checkIn, checkOut) => ({
  roomId,
  status: "confirmed",
  checkIn: { [Op.lt]: checkOut },
  checkOut: { [Op.gt]: checkIn },
});

async function isRoomAvailable(roomId, checkIn, checkOut) {
  const clash = await Booking.count({ where: overlapWhere(roomId, checkIn, checkOut) });
  return clash === 0;
}

// Rooms occupied right now (used when the visitor has not picked dates yet)
async function bookedRoomIdsToday() {
  const today = new Date().toISOString().split("T")[0];

  const bookings = await Booking.findAll({
    attributes: ["roomId"],
    where: {
      status: "confirmed",
      checkIn: { [Op.lte]: today },
      checkOut: { [Op.gt]: today },
    },
  });

  return new Set(bookings.map((b) => b.roomId));
}

async function bookedRoomIdsBetween(checkIn, checkOut) {
  const bookings = await Booking.findAll({
    attributes: ["roomId"],
    where: {
      status: "confirmed",
      checkIn: { [Op.lt]: checkOut },
      checkOut: { [Op.gt]: checkIn },
    },
  });

  return new Set(bookings.map((b) => b.roomId));
}

module.exports = {
  overlapWhere,
  isRoomAvailable,
  bookedRoomIdsToday,
  bookedRoomIdsBetween,
};
