const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Room = require("./Room");

const Booking = sequelize.define(
  "Booking",
  {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Room, key: "id" },
    },
    roomName: DataTypes.STRING, // name at the time of booking
    price: DataTypes.STRING, // price at the time of booking

    customerName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    whatsapp: DataTypes.STRING, // falls back to phone when the guest leaves it blank
    email: { type: DataTypes.STRING, allowNull: false },

    checkIn: { type: DataTypes.DATEONLY, allowNull: false },
    checkOut: { type: DataTypes.DATEONLY, allowNull: false },
    checkInTime: DataTypes.STRING,
    checkOutTime: DataTypes.STRING,

    identityType: DataTypes.STRING,
    identityNumber: DataTypes.STRING,

    extraGuests: { type: DataTypes.INTEGER, defaultValue: 0 },
    children: { type: DataTypes.INTEGER, defaultValue: 0 },

    status: {
      type: DataTypes.STRING,
      defaultValue: "confirmed", // confirmed | cancelled
    },

    roomImage: { type: DataTypes.BLOB, allowNull: true },
    invoice_pdf: { type: DataTypes.BLOB, allowNull: true },
  },
  {
    tableName: "bookings",
    timestamps: true,
  }
);

Room.hasMany(Booking, { foreignKey: "roomId" });
Booking.belongsTo(Room, { foreignKey: "roomId" });

module.exports = Booking;
