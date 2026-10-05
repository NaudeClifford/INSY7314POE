const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); 
const bookingRoutes = require("./routes/bookingRoutes");
const gigRoutes = require("./routes/gigRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/transactions", transactionRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;