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
  getActiveQuizzes,
} = require("../controllers/quiz.controller");

router.post("/", authenticate, isAdmin, createQuiz);
router.put("/:id", authenticate, isAdmin, updateQuiz);
router.delete("/:id", authenticate, isAdmin, deleteQuiz);
router.get("/", authenticate, isAdmin, getAllQuizzes);
router.get("/activeQuizzez", getActiveQuizzes);
router.get("/:id", getQuiz);
router.get("/:id/questions", getQuizQuestins);

module.exports = router;
