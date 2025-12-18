require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();

// ===== CORS =====
// Allow GitHub Pages frontend
app.use(cors({
  origin: 'https://bethanykeith.github.io'
}));

// Allow JSON parsing
app.use(express.json());

// ===== MongoDB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ===== API routes =====
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// ===== Optional: Serve React frontend =====
// Only needed if you serve React from this same backend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build"))); // path to your React build

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// ===== Start server =====
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
