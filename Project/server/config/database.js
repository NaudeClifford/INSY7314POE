const mongoose = require("mongoose");

// Inside server/config/database.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error Details:", error); // <-- Updated to show full error
    process.exit(1);
  }
};

module.exports = connectDB;
