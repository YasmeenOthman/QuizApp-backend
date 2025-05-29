const Category = require("../models/category");
const Quiz = require("../models/quiz");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = req.body;
    await Category.create(category);
    res.status(201).send(category);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get a category by ID
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.send(category);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return res.status(404).send({ error: "Category not found" });
    res.send(category);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

// Get all quizzes in a category
const getAllCategoryQuizzez = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ category: req.params.id });
    res.send(quizzes);
  } catch (err) {
    res.status(500).send({ msg: "internal server error", error: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategoryQuizzez,
};
