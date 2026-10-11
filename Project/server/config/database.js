const mongoose = require("mongoose");

// Inside server/config/database.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || "HustleHub"
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
