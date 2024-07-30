import asyncHandler from "express-async-handler";
import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";

// @desc    Create an exam
// @route   POST /api/exam/create
// @access  Private (Teacher)
export const createExam = asyncHandler(async (req, res) => {
  const { exam_name, total_marks, total_time, course } = req.body;

  const exam = new Exam({
    exam_name,
    total_marks,
    total_time,
    course,
    created_by: req.user._id,
  });

  try {
    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Unable to create exam");
  }
});

// @desc    Get all exams for a teacher
// @route   GET /api/exam/teacher
// @access  Private (Teacher)
export const getTeacherExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find({ created_by: req.user._id }).populate(
    "course",
    "course_name"
  );

  const examsWithQuestionCount = await Promise.all(
    exams.map(async (exam) => {
      const questionCount = await Question.countDocuments({ exam: exam._id });
      return { ...exam.toObject(), no_of_questions: questionCount };
    })
  );

  res.json(examsWithQuestionCount);
});

// @desc    Update an exam
// @route   PUT /api/exam/:id
// @access  Private (Teacher)
export const updateExam = asyncHandler(async (req, res) => {
  const { exam_name, total_marks, total_time, active } = req.body;

  const exam = await Exam.findById(req.params.id);

  if (exam) {
    exam.exam_name = exam_name || exam.exam_name;
    exam.total_marks = total_marks || exam.total_marks;
    exam.total_time = total_time || exam.total_time;
    exam.active = active !== undefined ? active : exam.active;

    const updatedExam = await exam.save();
    res.json(updatedExam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
});

// @desc    Delete an exam
// @route   DELETE /api/exam/:id
// @access  Private (Teacher)
export const deleteExam = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await Exam.findOneAndDelete({ _id: id });

    res.json({ message: "The exam has been deleted" });
  } catch (error) {
    res.status(404);
    throw new Error("Exam not found");
  }
});

// @desc    Get a single exam
// @route   GET /api/exam/:id
// @access  Private (Teacher)
export const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate(
    "course",
    "course_name"
  );

  if (exam) {
    const questionCount = await Question.countDocuments({ exam: exam._id });
    const examWithQuestionCount = {
      ...exam.toObject(),
      no_of_questions: questionCount,
    };
    res.json(examWithQuestionCount);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
});
