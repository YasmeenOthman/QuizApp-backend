const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/question");
const Category = require("../models/category");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    // const userId = req.user._id;

    // Check if the category exists, otherwise create it
    let category = await Category.findOne({ name: req.body.categoryName });
    if (!category) {
      category = new Category({
        name: req.body.categoryName,
        description: req.body.categoryDescription,
      });
      await category.save();
    }

    const categoryId = category._id;

    // Create the quiz
    const { title, description, status, imageUrl } = req.body;
    // let oldQuiz = await Quiz.findOne({ title });
    const quizData = {
      title,
      description,
      status,
      imageUrl,
      category: categoryId,
      // createdBy: userId,
    };

    const quiz = new Quiz(quizData);
    await quiz.save();

    // Update the category with the new quiz ID
    category.quizzes.push(quiz._id);
    await category.save();

    res
      .status(201)
      .send({ msg: `${quiz.title} quiz is created successfully`, quiz });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("createdBy")
      .populate("category");
    res.send(quizzes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get a quiz by ID
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("questions")
      .populate("category");
    if (!quiz) return res.status(404).send({ error: "Quiz not found" });
    res.send(quiz);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Update a quiz by ID
const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).send({ error: "Quiz not found" });
    res.send(quiz);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) return res.status(404).send({ error: "Quiz not found" });
    // Remove the quiz ID from the category's quizzes array
    await Category.findByIdAndUpdate(quiz.category, {
      $pull: { quizzes: quiz._id },
    });
    res.send({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get all questions in a quiz
const getQuizQuestins = async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.id });
    res.send(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  deleteQuiz,
  updateQuiz,
  getQuizQuestins,
};
