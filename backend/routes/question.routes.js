const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const {
  createQuestion,
  getQuestionsByQuiz,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question.controller");

// Create a new question
// router.post("/", authenticate, isAdmin, createQuestion);
router.post("/", createQuestion);

// Get all questions for a specific quiz
router.get("/quiz/:quizId", getQuestionsByQuiz);

// Get a single question by ID
router.get("/:id", getQuestionById);

// Update a question by ID
router.put("/:id", updateQuestion);

// Delete a question by ID
router.delete("/:id", deleteQuestion);

module.exports = router;
