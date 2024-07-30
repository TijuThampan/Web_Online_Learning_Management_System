import asyncHandler from "express-async-handler";
import Attempt from "../models/attemptModel.js";
import Course from "../models/courseModel.js";
import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";
import Student from "../models/studentModel.js";

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

// @desc    Get exams for enrolled courses
// @route   GET /api/exam/enrolled
// @access  Private (Student)
export const getEnrolledExams = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  console.log("studentId", studentId);

  // Find the student and get their enrolled courses
  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  const enrolledCourseIds = student.course;
  console.log("enrolledCourseIds", enrolledCourseIds);

  // Get all exams for these courses
  const exams = await Exam.find({
    course: { $in: enrolledCourseIds },
  }).populate("course", "course_name");

  if (exams.length > 0) {
    // Get question count for each exam and check attempt status
    const examsWithQuestionCountAndStatus = await Promise.all(
      exams.map(async (exam) => {
        const questionCount = await Question.countDocuments({ exam: exam._id });
        const attempt = await Attempt.findOne({
          student: studentId,
          exam: exam._id,
        });
        return {
          ...exam.toObject(),
          no_of_questions: questionCount,
          status: attempt ? "attempted" : "pending",
        };
      })
    );

    res.json(examsWithQuestionCountAndStatus);
  } else {
    res.json([]);
  }
});

// @desc    Get a single exam for enrolled student
// @route   GET /api/exam/enrolled/:id
// @access  Private (Student)
export const getEnrolledExamById = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const examId = req.params.id;

  const exam = await Exam.findById(examId).populate(
    "course",
    "course_name students"
  );

  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  // Check if the student is enrolled in the course
  if (!exam.course.students.includes(studentId)) {
    res.status(403);
    throw new Error("Not authorized to access this exam");
  }

  if (exam.active) {
    const questionCount = await Question.countDocuments({ exam: exam._id });
    const examWithQuestionCount = {
      ...exam.toObject(),
      no_of_questions: questionCount,
    };
    res.json(examWithQuestionCount);
  } else {
    res.status(403);
    throw new Error("This exam is not active");
  }
});

// @desc    Get results for student
// @route   GET /api/exam/results
// @access  Private (Student)
export const getStudentResults = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // Get the student document
  const student = await Student.findById(studentId);

  if (!student || !student.course.length) {
    return res.json([]);
  }

  const results = [];

  for (const courseId of student.course) {
    // Find the course
    const course = await Course.findById(courseId);

    if (!course) continue;

    // Find exams for each enrolled course
    const exams = await Exam.find({ course: courseId });

    for (const exam of exams) {
      // Check if the student has attempted and submitted the exam
      const attempt = await Attempt.findOne({
        student: studentId,
        exam: exam._id,
        status: "submitted",
      });

      if (!attempt) continue;

      results.push({
        exam_name: exam.exam_name,
        course_name: course.course_name,
        total_marks: attempt.totalMarks,
      });
    }
  }

  res.json(results);
});