const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// One row per bookable unit. The website shows these exact fields, so the
// room list on the site and the data in the database never drift apart.
const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "Basic",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxOccupancy: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    beds: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    ac: {
      type: DataTypes.STRING,
      defaultValue: "Non-AC",
    },
    amenities: {
      // stored as a comma separated string so it works on Postgres and SQLite
      type: DataTypes.STRING,
      defaultValue: "",
      get() {
        const raw = this.getDataValue("amenities");
        return raw ? raw.split(",").map((a) => a.trim()).filter(Boolean) : [];
      },
      set(value) {
        this.setDataValue(
          "amenities",
          Array.isArray(value) ? value.join(",") : value || ""
        );
      },
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    // Uploaded photo, kept in the database so it survives every restart and redeploy
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    photoType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    desc: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "rooms",
    timestamps: true,
  }
);

module.exports = Room;
