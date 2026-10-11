const Transaction = require("../models/Transaction");

// @desc    Get user income breakdown and monthly aggregation
// @route   GET /api/income
exports.getIncomeData = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find all completed/paid transactions for this user
    const transactions = await Transaction.find({
      freelancerId: userId, status: "completed"
    }).populate("bookingId", "status").sort({ createdAt: 1 });

    let gross = 0;
    let fees = 0;
    let tax = 0;
    let net = 0;

    const monthlyMap = {};

    transactions.filter(tx => tx.bookingId?.status === "completed").forEach((tx) => {
      const txAmount = tx.amount || 0;
      const txFee = tx.platformFee || 0;
      const txTax = tx.taxAmount || 0;
      const txNet = tx.freelancerAmount ?? (txAmount - txFee - txTax);

      gross += txAmount;
      fees += txFee;
      tax += txTax;
      net += txNet;

      // Group monthly aggregation
      if (tx.createdAt) {
        const monthLabel = new Date(tx.createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric"
        });

        monthlyMap[monthLabel] = (monthlyMap[monthLabel] || 0) + txNet;
      }
    });

    const monthlyIncome = Object.keys(monthlyMap).map((label) => ({
      month: label,
      amount: monthlyMap[label]
    }));

    res.status(200).json({
      success: true,
      income: {
        summary: { gross, fees, tax, net },
        monthlyIncome
      }
    });
  } catch (error) {
    next(error);
  }
};
