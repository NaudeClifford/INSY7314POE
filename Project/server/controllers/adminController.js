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


///api/auth/me
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

//Logout
exports.logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.status(200).json({
        message: "Logged out successfully."
    });
};
