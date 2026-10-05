const express = require("express");
const router = express.Router();
const {
  getAllAdminGigs,
  updateAdminGigStatus,
  deleteAdminGig,
} = require("../controllers/adminController");

// Mount routes
router.get("/gigs", getAllAdminGigs);
router.put("/gigs/:id", updateAdminGigStatus);
router.delete("/gigs/:id", deleteAdminGig);

module.exports = router;