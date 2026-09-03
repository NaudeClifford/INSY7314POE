const express = require("express");

const router = express.Router();

const {
    getUsers,
    createUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// GET USERS (now requires a valid JWT)
router.get("/", protect, getUsers);


// CREATE USER
router.post("/", createUser);


module.exports = router;