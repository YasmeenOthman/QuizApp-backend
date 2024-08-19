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
} = require("../controllers/category.controller");

router.post("/", authenticate, isAdmin, createCategory);
router.get("/", authenticate, isAdmin, getCategories);
router.get("/:id", authenticate, isAdmin, getCategory);
router.put("/:id", authenticate, isAdmin, updateCategory);
router.delete("/:id", authenticate, isAdmin, deleteCategory);
router.get("/:id/quizzes", authenticate, isAdmin, getAllCategoryQuizzez);
module.exports = router;
