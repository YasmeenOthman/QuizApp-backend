const express = require("express");
const router = express.Router();
const { registerAdmin ,  getAllUsers} = require("../controllers/admin");
const authenticate = require("../middleware/auth")
const isAdmin = require("../middleware/isAdmin")

// Register a new admin (Requires authentication and admin role)
router.post('/register-admin', authenticate, isAdmin, registerAdmin);
router.get('/users', authenticate, isAdmin, getAllUsers);

module.exports = router
