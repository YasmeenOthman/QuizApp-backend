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
      equation,
      hasEquation,
    } = req.body;
    console.log(req.body);
    // Create the new question
    const question = new Question({
      quiz: quizId,
      questionText,
      questionType,
      choices,
      correctAnswer,
      explanation,
      equation,
      hasEquation,
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
    const questionId = req.params.id;

    // Find the question
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).send({ error: "Question not found" });

    // Remove the question from the quiz's questions array
    // Find the quiz that contains this question
    const quiz = await Quiz.findById(question.quiz);
    if (!quiz) return res.status(404).send({ error: "Quiz not found" });

    // Find the index of the questionId in the quiz's questions array
    const index = quiz.questions.indexOf(questionId);

    // If the questionId is found, use splice to remove it
    if (index !== -1) {
      quiz.questions.splice(index, 1);
      await quiz.save();
    }

    // Delete the question
    await Question.findByIdAndDelete(questionId);

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
