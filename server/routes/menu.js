const express = require("express");
const router = express.Router();
const {
  getMenu,
  createMenuItem
} = require("../controllers/menuController");

router.get("/", getMenu);
router.post("/", createMenuItem);

module.exports = router;
