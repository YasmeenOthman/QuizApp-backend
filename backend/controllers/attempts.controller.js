const Attempt = require("../models/attempt");
const Answer = require("../models/answer");

const createAttempt = async (req, res) => {
  try {
    const attempt = req.body;
    await Attempt.create(attempt);
    res.status(201).send(attempt);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get all attempts (admin only)
const getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find().populate("user quiz");
    res.send(attempts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get an attempt by ID
const getAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate(
      "user quiz answers"
    );
    if (!attempt) return res.status(404).send({ error: "Attempt not found" });
    res.send(attempt);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get all attempts by a user
const getUsersAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.params.userId }).populate(
      "quiz"
    );
    res.send(attempts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Get all attempts for a quiz
const getQuizAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ quiz: req.params.quizId }).populate(
      "user"
    );
    res.send(attempts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createAttempt,
  getAllAttempts,
  getAttempt,
  getQuizAttempts,
  getUsersAttempts,
};
