const Transaction = require("../models/Transaction");
const Booking = require("../models/Booking");

// @desc    Create a new transaction (payment log)
// @route   POST /api/transactions
exports.createTransaction = async (req, res, next) => {
  try {
    const { bookingId, amount, taxAmount = 0 } = req.body;

    // Retrieve booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Calculate standard 10% platform fee split
    const platformFee = Number((amount * 0.1).toFixed(2));
    const freelancerAmount = Number((amount - platformFee).toFixed(2));
    const invoiceNumber = `INV-${Date.now()}`;

    const transaction = await Transaction.create({
      bookingId,
      clientId: booking.clientId,
      freelancerId: booking.freelancerId,
      amount,
      platformFee,
      freelancerAmount,
      taxAmount,
      status: "completed",
      invoiceNumber
    });

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

// @desc    Get transaction history for a logged-in user
// @route   GET /api/transactions/my-transactions
exports.getMyTransactions = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id || req.query.userId;

    const transactions = await Transaction.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    })
      .populate("bookingId")
      .populate("clientId", "name email")
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: transactions.length, transactions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction / invoice details
// @route   GET /api/transactions/:id
exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("bookingId")
      .populate("clientId", "name email phone location")
      .populate("freelancerId", "name email phone location");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

// @desc    Process payout for freelancer
// @route   PATCH /api/transactions/:id/payout
exports.processPayout = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { payoutDate: new Date() },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};