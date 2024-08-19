const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  createAttempt,
  getAllAttempts,
  getAttempt,
  getQuizAttempts,
  getUsersAttempts,
} = require("../controllers/attempts.controller");

// Create a new attempt
router.post("/", createAttempt);
// Get all attempts (admin only)
router.get("/", authenticate, isAdmin, getAllAttempts);
// Get an attempt by ID
router.get("/:id", getAttempt);
// Get all attempts by a user
router.get("/user/:userId", getUsersAttempts);
// Get all attempts for a quiz
router.get("/quiz/:quizId", getQuizAttempts);

module.exports = router;
