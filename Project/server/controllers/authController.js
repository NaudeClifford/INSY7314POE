const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Generate salt -> hash  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create + save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "Client"
    });

    await newUser.save();

    //  success message (excluding sensitive data)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
  }
};

module.exports = {
  registerUser
};