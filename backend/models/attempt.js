const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateAttempted: { type: Date, default: Date.now },
  score: Number,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  timeTaken: Number, // In seconds
});

const Attempt = mongoose.model("Attempt", attemptSchema);
module.exports = Attempt;
