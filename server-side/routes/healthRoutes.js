// routes/healthRoutes.js
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

module.exports = router;
