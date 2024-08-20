const Quiz = require("../models/Quiz");
const Question = require("../models/question");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const questionData = {
      quiz: req.body.quizId,
      questionText: req.body.questionText,
      questionType: req.body.questionType,
      choices: req.body.choices,
      correctAnswer: req.body.correctAnswer,
      explanation: req.body.explanation,
    };

    const question = new Question(questionData);
    await question.save();

    // Update the quiz with the new question ID
    await Quiz.findByIdAndUpdate(req.body.quizId, {
      $push: { questions: question._id },
    });

    res.status(201).send(question);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Get all questions for a specific quiz
const getQuestionsByQuiz = async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.quizId });
    res.send(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).send({ error: "Question not found" });
    res.send(question);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!question) return res.status(404).send({ error: "Question not found" });
    res.send(question);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).send({ error: "Question not found" });
    res.send({ message: "Question deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Internal server error", error: err.message });
  }
};

module.exports = {
  createQuestion,
  getQuestionsByQuiz,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
