const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  deleteQuiz,
  updateQuiz,
  getQuizQuestins,
} = require("../controllers/quiz.controller");

// router.post("/", authenticate, isAdmin, createQuiz);
router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuiz);
// router.put("/:id", authenticate, isAdmin, updateQuiz);
router.put("/:id", updateQuiz);
// router.delete("/:id", authenticate, isAdmin, deleteQuiz);
router.delete("/:id", deleteQuiz);
router.get("/:id/questions", getQuizQuestins);

module.exports = router;
