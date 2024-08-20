const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    enum: ["multiple-choice", "true-false"],
    required: true,
  },
  choices: [String], // Only used for multiple-choice questions
  correctAnswer: mongoose.Schema.Types.Mixed, // Could be a String or Boolean depending on questionType
  explanation: String, // Optional explanation for the correct answer
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
