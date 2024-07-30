import asyncHandler from "express-async-handler";
import Attempt from "../models/attemptModel.js";
import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";

// @desc    Start an attempt
// @route   POST /api/attempt/start
// @access  Private (Student)
export const startAttempt = asyncHandler(async (req, res) => {
  const { examId } = req.body;
  const studentId = req.user._id;

  const exam = await Exam.findById(examId);
  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  const existingAttempt = await Attempt.findOne({
    student: studentId,
    exam: examId,
    status: "started",
  });
  if (existingAttempt) {
    res.status(400);
    throw new Error("You already have an ongoing attempt for this exam");
  }

  const attempt = new Attempt({
    student: studentId,
    exam: examId,
    status: "started",
  });

  const createdAttempt = await attempt.save();
  res.status(201).json(createdAttempt);
});

// @desc    Get attempt questions
// @route   GET /api/attempt/:id/questions
// @access  Private (Student)
export const getAttemptQuestions = asyncHandler(async (req, res) => {
  const attempt = await Attempt.findById(req.params.id).populate("exam");

  if (!attempt) {
    res.status(404);
    throw new Error("Attempt not found");
  }

  if (attempt.student.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to access this attempt");
  }

  const questions = await Question.find({ exam: attempt.exam._id });

  const filteredQuestions = questions.map(
    ({ _id, question_text, mark, option1, option2, option3, option4 }) => ({
      _id,
      question_text,
      mark,
      option1,
      option2,
      option3,
      option4,
    })
  );

  res.json(filteredQuestions);
});

// @desc    Submit attempt
// @route   POST /api/attempt/:id/submit
// @access  Private (Student)
export const submitAttempt = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const attempt = await Attempt.findById(req.params.id).populate("exam");

  if (!attempt) {
    res.status(404);
    throw new Error("Attempt not found");
  }

  if (attempt.student.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to modify this attempt");
  }

  if (attempt.status === "submitted") {
    res.status(400);
    throw new Error("This attempt has already been submitted");
  }

  let totalMarks = 0;

  // Replace all answers and calculate total marks
  attempt.answers = await Promise.all(
    answers.map(async ({ question, chosenAnswer }) => {
      const questionDoc = await Question.findById(question);
      if (questionDoc && questionDoc.answer === chosenAnswer) {
        totalMarks += questionDoc.mark;
      }
      return {
        question: question,
        chosenAnswer,
      };
    })
  );

  attempt.status = "submitted";
  attempt.totalMarks = totalMarks;

  await attempt.save();
  res.status(200).json({ message: "Attempt submitted successfully", attempt });
});

// @desc    Get all attempts for student
// @route   GET /api/exam/attempts
// @access  Private (Student)
export const getAllAttempts = asyncHandler(async (req, res) => {
  const attempts = await Attempt.find()
    .populate("exam", "exam_name")
    .populate("student", "stud_name")
    .populate({
      path: "exam",
      populate: {
        path: "course",
        select: "course_name",
      },
    });

  console.log(attempts[0]);

  const formattedAttempts = attempts.map((attempt) => ({
    _id: attempt._id,
    exam_name: attempt.exam.exam_name,
    course_name: attempt.exam.course.course_name,
    student_name: attempt.student.stud_name,
    total_marks: attempt.totalMarks,
    status: attempt.status,
    attempt_date: attempt.createdAt,
  }));

  res.json(formattedAttempts);
});

// @desc    Delete an attempt
// @route   DELETE /api/attempt/:id
// @access  Private (Student)
export const deleteAttempt = asyncHandler(async (req, res) => {
  const attemptId = req.params.id;
  const teacherId = req.user._id;

  const attempt = await Attempt.findById(attemptId);

  if (!attempt) {
    res.status(404);
    throw new Error("Attempt not found");
  }

  // Check if the user is a teacher
  if (req.user.user_type !== "teacher") {
    res.status(403);
    throw new Error("Not authorized. Only teachers can delete attempts");
  }

  await Attempt.deleteOne({ _id: attemptId });

  res.json({ message: "Attempt deleted successfully" });
});
