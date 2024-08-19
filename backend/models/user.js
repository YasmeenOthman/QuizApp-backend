const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  dateRegistered: { type: Date, default: Date.now },
  quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
