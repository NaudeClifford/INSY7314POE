const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;