const express = require("express");
const router = express.Router();
const {
  createAnswer,
  getAnswersByAttempt,
  updateAnswer,
} = require("../controllers/answer.controller");

// Create an answer
router.post("/", createAnswer);

// Get all answers for a specific attempt
router.get("/attempt/:attemptId", getAnswersByAttempt);

// Update an answer
router.put("/:id", updateAnswer);

module.exports = router;
