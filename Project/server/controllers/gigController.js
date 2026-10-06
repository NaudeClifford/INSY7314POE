const Gig = require("../models/Gig");

// @desc    Get all active gigs (with search, category, and price filters)
// @route   GET /api/gigs
exports.getGigs = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    let query = { status: "active", isActive: true };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const gigs = await Gig.find(query)
      .populate("freelancerId", "name email profilePicture rating")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: gigs.length, gigs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gig by ID
// @route   GET /api/gigs/:id
exports.getGigById = async (req, res, next) => {
  try {
    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("freelancerId", "name email profilePicture bio location rating");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({ success: true, gig });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new gig
// @route   POST /api/gigs
exports.createGig = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      price,
      deliveryDays,
      location,
      imageUrl,
      weather
    } = req.body;

    // Fixed: Supports both req.user.id and req.user._id
    const freelancerId = req.user?.id || req.user?._id || req.body.freelancerId;

    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required." });
    }

    const gig = await Gig.create({
      freelancerId,
      title,
      description,
      category,
      price,
      deliveryDays,
      location,
      imageUrl: imageUrl || "",
      weather
    });

    res.status(201).json({ success: true, gig });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing gig
// @route   PUT /api/gigs/:id
exports.updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
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
// @route   DELETE /api/gigs/:id
exports.deleteGig = async (req, res, next) => {
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

// @desc    Get gigs created by the logged-in freelancer
// @route   GET /api/gigs/my-gigs
exports.getMyGigs = async (req, res, next) => {
  try {
    // Fixed: Supports both req.user.id and req.user._id
    const freelancerId = req.user?.id || req.user?._id || req.query.freelancerId;

    const gigs = await Gig.find({ freelancerId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, gigs });
  } catch (error) {
    next(error);
  }
};