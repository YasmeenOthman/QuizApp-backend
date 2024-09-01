const Quiz = require("../models/Quiz");
const Question = require("../models/question");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const {
      quizId,
      questionText,
      questionType,
      choices,
      correctAnswer,
      explanation,
    } = req.body;

    // Create the new question
    const question = new Question({
      quiz: quizId,
      questionText,
      questionType,
      choices,
      correctAnswer,
      explanation,
    });
    // Save the question to the database
    const savedQuestion = await question.save();

    // Add the question to the quiz's questions array
    let quiz = await Quiz.findByIdAndUpdate(quizId);
    if (quiz) {
      quiz.questions.push(savedQuestion._id);
      await quiz.save();
    } else {
      res.send({ msg: "The quiz is not found" });
    }

    res
      .status(201)
      .send({ msg: "question created successfully", savedQuestion });
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
    res.send({ msg: "Question deleted successfully" });
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
