const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Applies shared middleware before requests reach any API route.
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// These must be registered after all valid routes.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
