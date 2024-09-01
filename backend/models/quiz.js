const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
