const User = require("../models/user");
const bcrypt = require("bcrypt");

// admin create another admin
const registerUserAsAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).send({ msg: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Admin account already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const adminUser = {
      username,
      email,
      password: hashedPassword,
      role: "admin",
    };

    // create the admin user to the database
    await User.create(adminUser)

    res
      .status(201)
      .json({ message: "Admin registered successfully", adminUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Update user or admin by admin
const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    // Optionally hash the new password if it's being updated
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

// Delete user or admin by admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send({ error: "User not found" });
    res.send({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = { registerUserAsAdmin, updateUser, deleteUser, getAllUsers };
