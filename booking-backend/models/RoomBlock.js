const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Room = require("./Room");

// Staff blocking a unit: maintenance, owner stay, or a booking taken on the
// phone. A blocked range makes the room unavailable exactly like a booking.
const RoomBlock = sequelize.define(
  "RoomBlock",
  {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Room, key: "id" },
    },
    from: { type: DataTypes.DATEONLY, allowNull: false },
    to: { type: DataTypes.DATEONLY, allowNull: false }, // exclusive, same rule as checkOut
    reason: { type: DataTypes.STRING, defaultValue: "Blocked" },
  },
  {
    tableName: "room_blocks",
    timestamps: true,
  }
);

Room.hasMany(RoomBlock, { foreignKey: "roomId" });
RoomBlock.belongsTo(Room, { foreignKey: "roomId" });

module.exports = RoomBlock;
