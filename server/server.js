require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();

// CORS — allow GitHub Pages
app.use(cors({
  origin: [
    "https://bethanykeith.github.io"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// API routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Test route 
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
