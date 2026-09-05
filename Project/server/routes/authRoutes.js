const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const validateRegistration = require("../middleware/validateRegistration");
const validateLogin = require("../middleware/validateLogin");

// POST /api/auth/register
router.post("/register", validateRegistration, registerUser);

// POST /api/auth/login
router.post("/login", validateLogin, loginUser);

module.exports = router;
