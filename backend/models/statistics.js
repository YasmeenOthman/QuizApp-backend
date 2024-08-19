const mongoose = require("mongooe");

const statisticSchema = new mongoose.Schema({
  totalQuizzesTaken: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  mostActiveUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  highestScoringQuiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  dateUpdated: { type: Date, default: Date.now },
});

const Statistic = mongoose.model("Statistic", statisticSchema);
module.exports = Statistic;
