const User = require("../models/user")

const registerAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin user
      const adminUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });
  
      // Save the admin user to the database
      await adminUser.save();
  
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
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  module.exports = {registerAdmin, getAllUsers}