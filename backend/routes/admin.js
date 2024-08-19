const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth")
const isAdmin = require("../middleware/isAdmin")
const { registerUserAsAdmin,updateUser,deleteUser,getAllUsers} = require("../controllers/admin");

// Register a new admin (Requires authentication and admin role)
router.post('/register-admin', authenticate, isAdmin, registerUserAsAdmin);

// Admin routes (restricted to admins only)
router.put("/user/:id", authenticate, isAdmin, updateUser);
router.delete("/user/:id", authenticate, isAdmin, deleteUser);
router.get("/users", authenticate, isAdmin, getAllUsers);

module.exports = router
