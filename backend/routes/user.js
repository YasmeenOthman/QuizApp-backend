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
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/attempts", getAllUserAttempts);

module.exports = router;
