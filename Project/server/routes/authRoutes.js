const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");
const validateRegistration = require("../middleware/validateRegistration");

// POST /api/auth/register
router.post("/register", validateRegistration, registerUser);

module.exports = router;