const express = require("express");

const router = express.Router();

const {
    getUsers,
    createUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const validateRegistration = require("../middleware/validateRegistration");

// GET USERS (requires a valid JWT)
router.get("/", protect, getUsers);


// CREATE USER
router.post("/", validateRegistration, createUser);


module.exports = router;