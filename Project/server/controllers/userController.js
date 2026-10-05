const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET ALL USERS
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("_id name email role createdAt");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// CREATE USER
const createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword
    });

    const savedUser = await user.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER PROFILE
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.query.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER PROFILE
const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.body.userId;
    const { name, phone, bio, skills, location, profilePicture } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (location !== undefined) user.location = location;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        phone: updatedUser.phone,
        location: updatedUser.location
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET PUBLIC PROFILE
const getPublicUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name email role profilePicture bio skills location createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserProfile,
  updateUserProfile,
  getPublicUserProfile
};