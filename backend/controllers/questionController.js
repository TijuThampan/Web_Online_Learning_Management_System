import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";

// @desc    Create a question
// @route   POST /api/question/create
// @access  Private (Teacher)
export const createQuestion = asyncHandler(async (req, res) => {
  const {
    exam,
    question_text,
    mark,
    option1,
    option2,
    option3,
    option4,
    answer,
  } = req.body;

  const question = new Question({
    exam,
    question_text,
    mark,
    option1,
    option2,
    option3,
    option4,
    answer,
  });

  try {
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Unable to create question");
  }
});

// @desc    Get all questions for an exam
// @route   GET /api/question/exam/:examId
// @access  Private (Teacher)
export const getExamQuestions = asyncHandler(async (req, res) => {
  try {
    const questions = await Question.find({ exam: req.params.examId });
    res.json(questions);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching exam questions");
  }
});

// @desc    Update a question
// @route   PUT /api/question/:id
// @access  Private (Teacher)
export const updateQuestion = asyncHandler(async (req, res) => {
  const {
    question_text,
    mark,
    option1,
    option2,
    option3,
    option4,
    answer,
    active,
  } = req.body;

  const question = await Question.findById(req.params.id);

  if (question) {
    question.question_text = question_text || question.question_text;
    question.mark = mark || question.mark;
    question.option1 = option1 || question.option1;
    question.option2 = option2 || question.option2;
    question.option3 = option3 || question.option3;
    question.option4 = option4 || question.option4;
    question.answer = answer || question.answer;
    question.active = active !== undefined ? active : question.active;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Delete a question
// @route   DELETE /api/question/:id
// @access  Private (Teacher)
export const deleteQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Question.findOneAndDelete({ _id: id });
    res.json({ message: "The question has been deleted" });
  } catch (error) {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Get a single question
// @route   GET /api/question/:id
// @access  Private (Teacher)
export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate(
    "exam",
    "exam_name"
  );

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});
