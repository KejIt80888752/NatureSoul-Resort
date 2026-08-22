const sequelize = require("../config/db");
const Room = require("./Room");
const Booking = require("./Booking");
const RoomBlock = require("./RoomBlock");

module.exports = { sequelize, Room, Booking, RoomBlock };
