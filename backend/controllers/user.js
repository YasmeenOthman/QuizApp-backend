const User = require("../models/user");
const Attempt = require("../models/attempt.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role, // This will be 'student' by default, but can be 'admin' if specified
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message, msg: "hi" });
  }
};

// Login user and return token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get a user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all quiz attempts by a user
const getAllUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.params.id }).populate(
      "quiz"
    );
    res.json(attempts);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
