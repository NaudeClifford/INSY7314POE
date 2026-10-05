const express = require("express");
const router = express.Router();
const {
  getGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig,
  getMyGigs
} = require("../controllers/gigController");

const { protect } = require("../middleware/authMiddleware"); // Import protect middleware

router.get("/", getGigs);
router.get("/my-gigs", protect, getMyGigs);
router.get("/:id", getGigById);

// Add protect middleware to POST, PUT, and DELETE routes:
router.post("/", protect, createGig);
router.put("/:id", protect, updateGig);
router.delete("/:id", protect, deleteGig);

module.exports = router;