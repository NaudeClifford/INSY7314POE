const Booking = require("../models/Booking");
const Gig = require("../models/Gig");

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res, next) => {
  try {
    const { gigId, freelancerId, location, agreedPrice, bookingDate } = req.body;

    // Verify gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    const booking = await Booking.create({
      gigId,
      clientId: req.user?._id || req.body.clientId, // Uses auth middleware req.user if available
      freelancerId,
      location,
      agreedPrice,
      bookingDate
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings for the logged-in user (as client or freelancer)
// @route   GET /api/bookings/my-bookings
exports.getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.query.userId;

    const bookings = await Booking.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    })
      .populate("gigId", "title category price imageUrl")
      .populate("clientId", "name email profilePicture")
      .populate("freelancerId", "name email profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("gigId")
      .populate("clientId", "name email phone")
      .populate("freelancerId", "name email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (pending, accepted, in_progress, completed, cancelled)
// @route   PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updateData = { status };
    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};