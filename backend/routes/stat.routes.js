const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  getAllStatistics,
  updateStatistics,
} = require("../controllers/stat.controller");

// Get overall statistics
router.get("/", authenticate, isAdmin, getAllStatistics);
// Update statistics (admin operation)
router.put("/", authenticate, isAdmin, updateStatistics);

module.exports = router;
