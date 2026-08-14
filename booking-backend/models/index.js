const sequelize = require("../config/db");
const Room = require("./Room");
const Booking = require("./Booking");

module.exports = { sequelize, Room, Booking };
