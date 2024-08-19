const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategoryQuizzez,
} = require("../controllers/category.controller");

// Create a new category (Admin only)
router.post("/", authenticate, isAdmin, createCategory);

// Get all categories
router.get("/", getCategories);

// Get a category by ID
router.get("/:id", getCategory);
router.get("/:id/quizzes", getAllCategoryQuizzez);

// Update a category (Admin only)
router.put("/:id", authenticate, isAdmin, updateCategory);

// Delete a category (Admin only)
router.delete("/:id", authenticate, isAdmin, deleteCategory);

module.exports = router;
