const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getMyTransactions,
  getTransactionById,
  processPayout
} = require("../controllers/transactionController");

router.post("/", createTransaction);
router.get("/my-transactions", getMyTransactions);
router.get("/:id", getTransactionById);
router.patch("/:id/payout", processPayout);

module.exports = router;