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

router.post("/", authenticate, isAdmin, createQuiz);
router.get("/", authenticate, isAdmin, getAllQuizzes);
router.get("/:id", authenticate, isAdmin, getQuiz);
router.put("/:id", authenticate, isAdmin, updateQuiz);
router.delete("/:id", authenticate, isAdmin, deleteQuiz);
router.get("/:id/questions", authenticate, isAdmin, getQuizQuestins);

module.exports = router;
