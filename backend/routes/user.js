const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth")
const isAdmin = require("../middleware/isAdmin")

const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getAllUserAttempts,
  getAllUsers
} = require("../controllers/user");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (for logged-in users)
router.get("/:id",authenticate, getUser);
router.put("/:id",authenticate, updateUser);
router.delete("/:id",authenticate, deleteUser);
router.get("/:id/attempts", authenticate,getAllUserAttempts);



module.exports = router;
