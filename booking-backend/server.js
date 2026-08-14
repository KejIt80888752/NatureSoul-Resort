require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/db");
const { connectDB } = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const adminAuth = require("./middlewares/adminAuth");
const seedRooms = require("./seed/roomSeed");

const app = express();

app.set("trust proxy", 1); // behind Render/Railway proxy

// Only the resort website may call this API.
// ALLOWED_ORIGINS="https://kejit80888752.github.io,https://naturesoulresort.com"
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // curl, mobile apps, server-to-server
      if (allowed.length === 0) return cb(null, true); // not configured yet → dev mode
      if (allowed.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} is not allowed`));
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A booking form should never be hammered
app.use(
  "/api/bookings",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, errors: ["Too many requests, please try again later"] },
  })
);

app.get("/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Kept for the existing admin dashboard
app.get("/api/admin/bookings", adminAuth, async (req, res) => {
  try {
    const { Booking } = require("./models");
    const bookings = await Booking.findAll({
      attributes: { exclude: ["roomImage", "invoice_pdf"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error("UNHANDLED:", err.message);
  res.status(500).json({ success: false, errors: [err.message] });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    // DB_SYNC=alter reshapes tables to match the models (use once after a model change).
    // Default is a plain sync: it creates missing tables and never drops data.
    await sequelize.sync(process.env.DB_SYNC === "alter" ? { alter: true } : {});

    await seedRooms();

    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

start();
