import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import Exam from "../models/examModel.js";
import Student from "../models/studentModel.js";

// @desc    Create a course
// @route   POST /api/course/create
// @access  Private

export const createCourse = asyncHandler(async (req, res) => {
  const { course_name, course_outline, total_units } = req.body;

  const course = new Course({
    course_name: course_name,
    course_outline: course_outline,
    total_units: total_units,
    created_by: req.user._id,
  });

  try {
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400);
    throw new Error("Unable to create course");
  }
});

//@desc Fetch all courses
//@route GET /api/course/all
//@access Public
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});

  res.json(courses);
});

//@desc Fetch specific courses
//@route GET /api/course/specific
//@access Private
export const getSpecificCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});

  const courseData = courses.filter((course) => {
    if (course.created_by.equals(req.user._id)) {
      return course;
    }
  });

  res.status(200).send(courseData);
});

// @desc    Update a course
// @route   POST /api/course/update/:id
// @access  Private

export const updateCourse = asyncHandler(async (req, res) => {
  const { course_name, course_outline, total_units } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.course_name = course_name;
    course.course_outline = course_outline;
    course.total_units = total_units;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Delete a course
// @route   POST /api/course/delete/:id
// @access  Private

export const deleteCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // Check if there are any exams associated with the course
    const examsAssociated = await Exam.exists({ course: id });

    if (examsAssociated) {
      res.status(400);
      throw new Error("Cannot delete course with associated exams");
    }

    const deletedCourse = await Course.findOneAndDelete({ _id: id });

    if (!deletedCourse) {
      res.status(404);
      throw new Error("Course not found");
    }

    res.json({ message: "The course has been deleted" });
  } catch (error) {
    res.status(error.status || 500);
    throw new Error(error.message || "Error deleting course");
  }
});
// @desc    Enroll a student in a course
// @route   POST /api/course/enroll/:id
// @access  Private
export const enrollStudent = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const studentId = req.body.studentId;

  const course = await Course.findById(courseId);
  const student = await Student.findById(studentId);

  if (!course || !student) {
    res.status(404);
    throw new Error("Course or Student not found");
  }

  // Check if student is already enrolled
  if (student.course.includes(courseId)) {
    res.status(400);
    throw new Error("Student is already enrolled in this course");
  }

  // Add course to student's courses
  student.course.push(courseId);
  await student.save();

  // Increment total_students in the course
  course.total_students += 1;
  await course.save();

  res.status(200).json({
    message: "Student successfully enrolled in the course",
    course: course,
    student: student,
  });
});

// @desc    Get all courses with enrollment status for logged-in student
// @route   GET /api/courses/status
// @access  Private (Student)
export const getCoursesWithEnrollmentStatus = asyncHandler(async (req, res) => {
  const studentId = req.user._id; // Assuming the student's ID is available in req.student after authentication

  // Fetch all courses
  const courses = await Course.find({});

  // Fetch the student's enrolled courses
  const student = await Student.findById(studentId).select("course");

  // Map courses to include enrollment status
  const coursesWithStatus = courses.map((course) => ({
    ...course.toObject(),
    isEnrolled: student.course.includes(course._id),
  }));

  res.json(coursesWithStatus);
});
