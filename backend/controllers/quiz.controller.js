const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/question");
const Category = require("../models/category");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const userId = req.user.id;

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
      createdBy: userId,
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

// Get Active quizzes
const getActiveQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      status: "active",
    })
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
      .populate("category")
      .populate("createdBy", "email");
    if (!quiz) return res.status(404).send({ error: "Quiz not found" });
    res.send(quiz);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// __________________Update a quiz by ID_____________________-
const updateQuiz = async (req, res) => {
  try {
    // Create an object to store fields to be updated
    let updateFields = gatherUpdateFields(req.body);

    // If a category is provided, find or create it, and update the category field
    if (req.body.category && req.body.category.name) {
      updateFields.category = await findOrCreateCategory(
        req.body.category.name
      );
    }
    // Prevent changing status to 'active' if there are no questions
    if (req.body.status === "active") {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz.questions.length) {
        return res.status(400).send({
          msg: "Cannot activate a quiz without questions",
          status: false,
        });
      }
    }

    // Find the quiz by ID and update with the collected fields
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    }).populate("category");

    if (!quiz)
      return res.status(404).send({ msg: "Quiz not found", status: false });
    return res.send(quiz);
  } catch (err) {
    res.status(500).send({
      msg: "Internal server error,Error updating quiz",
      error: err.message,
      status: false,
    });
  }
};

// ________________ Delete a quiz by ID_______________
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) return res.status(404).send({ msg: "Quiz not found" });
    // Remove the quiz ID from the category's quizzes array
    await Category.findByIdAndUpdate(quiz.category, {
      $pull: { quizzes: quiz._id },
    });
    res.send({ msg: "Quiz deleted successfully" });
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

// Helper function to gather fields to be updated
const gatherUpdateFields = (body) => {
  let fields = {};
  ["title", "description", "imageUrl", "status"].forEach((field) => {
    // Include the field even if it is an empty string
    // checks if the body has the property, regardless o
    // f its value. If the property exists, it will be included in the fields object, even if the value is an empty string.
    if (body.hasOwnProperty(field)) fields[field] = body[field];
  });
  return fields;
};

// Helper function to find or create a category
const findOrCreateCategory = async (categoryName) => {
  let category = await Category.findOne({ name: categoryName });
  if (!category) {
    category = new Category({ name: categoryName });
    await category.save();
    console.log(`Created new category: ${categoryName}`);
  }
  return category._id;
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  deleteQuiz,
  updateQuiz,
  getQuizQuestins,
  getActiveQuizzes,
};
