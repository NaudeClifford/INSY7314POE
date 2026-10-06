const express = require("express");
const router = express.Router();
const { getIncomeData } = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getIncomeData);

module.exports = router;