const { Op } = require("sequelize");
const Booking = require("../models/Booking");
const RoomBlock = require("../models/RoomBlock");

// Two stays clash when one starts before the other ends:
//   existing.checkIn < requested.checkOut  AND  existing.checkOut > requested.checkIn
// Same-day turnover (one guest checks out, next checks in) is allowed.
const overlapWhere = (roomId, checkIn, checkOut) => ({
  roomId,
  status: "confirmed",
  checkIn: { [Op.lt]: checkOut },
  checkOut: { [Op.gt]: checkIn },
});

// Staff blocks use the same rule on their own columns
const blockOverlapWhere = (checkIn, checkOut) => ({
  from: { [Op.lt]: checkOut },
  to: { [Op.gt]: checkIn },
});

async function isRoomAvailable(roomId, checkIn, checkOut) {
  const clash = await Booking.count({ where: overlapWhere(roomId, checkIn, checkOut) });
  if (clash > 0) return false;

  const blocked = await RoomBlock.count({
    where: { roomId, ...blockOverlapWhere(checkIn, checkOut) },
  });
  return blocked === 0;
}

// "Today" in the resort's own timezone (TZ is set in server.js), not UTC —
// otherwise availability flips a day early every night.
function todayLocal() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Rooms occupied right now (used when the visitor has not picked dates yet)
async function bookedRoomIdsToday() {
  const today = todayLocal();
  return bookedRoomIdsBetween(today, addDays(today, 1));
}

async function bookedRoomIdsBetween(checkIn, checkOut) {
  const [bookings, blocks] = await Promise.all([
    Booking.findAll({
      attributes: ["roomId"],
      where: {
        status: "confirmed",
        checkIn: { [Op.lt]: checkOut },
        checkOut: { [Op.gt]: checkIn },
      },
    }),
    RoomBlock.findAll({
      attributes: ["roomId"],
      where: blockOverlapWhere(checkIn, checkOut),
    }),
  ]);

  return new Set([...bookings, ...blocks].map((row) => row.roomId));
}

function addDays(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

module.exports = {
  overlapWhere,
  todayLocal,
  blockOverlapWhere,
  isRoomAvailable,
  bookedRoomIdsToday,
  bookedRoomIdsBetween,
  addDays,
};
