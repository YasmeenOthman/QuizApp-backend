const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  attempt: { type: mongoose.Schema.Types.ObjectId, ref: "Attempt" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  selectedAnswer: mongoose.Schema.Types.Mixed, // Could be a String or Boolean
  isCorrect: { type: Boolean, required: true },
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
