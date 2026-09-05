const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    // Let the startup function report the failure without exposing connection details.
    throw new Error("Unable to connect to MongoDB.");
  }
};

module.exports = connectDB;
