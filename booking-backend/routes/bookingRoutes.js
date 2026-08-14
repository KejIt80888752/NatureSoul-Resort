const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const upload = require("../middlewares/upload");
const adminAuth = require("../middlewares/adminAuth");

router.post("/", upload.single("roomImage"), bookingController.createBooking);

// Guest data — only the resort team may read it
router.get("/", adminAuth, bookingController.getAllBookings);
router.get("/invoice/:id", adminAuth, bookingController.downloadInvoice);

module.exports = router;
