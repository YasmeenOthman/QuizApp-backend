const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  registerUserByAdmin,
  updateUser,
  deleteUser,
  getAllUsers,
  
} = require("../controllers/admin.controller");

// Admin routes (restricted to admins only)
router.post("/register-admin", authenticate, isAdmin, registerUserByAdmin);
router.put("/user/:id", authenticate, isAdmin, updateUser);
router.delete("/user/:id", authenticate, isAdmin, deleteUser);
router.get("/users", authenticate, isAdmin, getAllUsers);

module.exports = router;
