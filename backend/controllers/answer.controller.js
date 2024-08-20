const Answer = require("../models/answer");
const Attempt = require("../models/attempt");
const Question = require("../models/question");

// Create an answer
const createAnswer = async (req, res) => {
  try {
    const { attemptId, questionId, selectedAnswer } = req.body;

    // Find the related attempt and question
    const attempt = await Attempt.findById(attemptId);
    const question = await Question.findById(questionId);

    if (!attempt || !question) {
      return res.status(404).send({ error: "Attempt or Question not found" });
    }

    // Determine if the selected answer is correct
    const isCorrect = question.correctAnswer === selectedAnswer;

    // Create a new answer
    const answer = new Answer({
      attempt: attemptId,
      question: questionId,
      selectedAnswer,
      isCorrect,
    });

    await answer.save();

    // Add the answer to the attempt's answers array
    attempt.answers.push(answer._id);
    await attempt.save();

    res.status(201).send(answer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Get all answers for a specific attempt
const getAnswersByAttempt = async (req, res) => {
  try {
    const answers = await Answer.find({ attempt: req.params.attemptId })
      .populate("question", "questionText")
      .populate("attempt");

    if (!answers.length) {
      return res
        .status(404)
        .send({ error: "No answers found for this attempt" });
    }

    res.send(answers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Update an answer (if needed)
const updateAnswer = async (req, res) => {
  try {
    const { selectedAnswer } = req.body;
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).send({ error: "Answer not found" });
    }

    // Check if the updated answer is correct
    const question = await Question.findById(answer.question);
    answer.selectedAnswer = selectedAnswer;
    answer.isCorrect = question.correctAnswer === selectedAnswer;

    await answer.save();
    res.send(answer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

module.exports = {
  createAnswer,
  getAnswersByAttempt,
  updateAnswer,
};
