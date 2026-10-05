const express = require("express");

const router = express.Router();

const {
    getUsers,
    createUser,
    getUserProfile,
    updateUserProfile,
    getPublicUserProfile
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const validateRegistration = require("../middleware/validateRegistration");

// GET USERS (requires a valid JWT)
router.get("/", protect, getUsers);

// CREATE USER
router.post("/", validateRegistration, createUser);

// USER PROFILE ROUTES
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/:id", protect, getPublicUserProfile);

module.exports = router;