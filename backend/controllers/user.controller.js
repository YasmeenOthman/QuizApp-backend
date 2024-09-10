const User = require("../models/user.js");
const Attempt = require("../models/attempt.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.send({ msg: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const user = {
        username,
        email,
        password: hashedPassword,
        role: role || "student",
      };

      await User.create(user);
      res
        .status(201)
        .send({ msg: "User registered successfully", status: true });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

// Login user and return token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ msg: "Invalid credentials, wrong email" });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .send({ msg: "Invalid credentials, wrong password" });
      }
    }
    const payload = {
      id: user._id,
      role: user.role,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.send({ token, status: true });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

// Get a user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ msg: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get all quiz attempts by a user
const getAllUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.params.id }).populate(
      "quiz"
    );
    res.send(attempts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getAllUserAttempts,
};
