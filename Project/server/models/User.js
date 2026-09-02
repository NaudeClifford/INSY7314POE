const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true 
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["Client", "Freelancer", "Admin"],
      default: "Client"
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("User", userSchema);