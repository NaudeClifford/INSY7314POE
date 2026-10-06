const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getMyTransactions,
  getTransactionById,
  processPayout
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");

// Protect all user transaction endpoints
router.post("/", protect, createTransaction);
router.get("/my-transactions", protect, getMyTransactions);
router.get("/:id", protect, getTransactionById);
router.patch("/:id/payout", protect, processPayout);

module.exports = router;