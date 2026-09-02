const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database Connection
const connectDB = require("./config/database");

// Route Imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API Running" });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connected successfully!"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});