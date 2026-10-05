const Gig = require("../models/Gig");

// @desc    Get all gigs for admin management
// @route   GET /api/admin/gigs
exports.getAllAdminGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find().populate("freelancerId", "name email");
    res.status(200).json({ success: true, gigs });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gig status
// @route   PUT /api/admin/gigs/:id
exports.updateAdminGigStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({ success: true, gig });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a gig
// @route   DELETE /api/admin/gigs/:id
exports.deleteAdminGig = async (req, res, next) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({ success: true, message: "Gig removed successfully" });
  } catch (error) {
    next(error);
  }
};