import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth student & get token
//@route POST  /api/student/login
//@access Public
const authStudent = asyncHandler(async (req, res) => {
  const { stud_email, password } = req.body;
  const student = await Student.findOne({ stud_email });

  if (student) {
    const isMatch = await bcrypt.compare(password, student.password);
    if (isMatch) {
      res.status(200).json({
        _id: student._id,
        stud_name: student.stud_name,
        stud_email: student.stud_email,
        stud_mobile: student.stud_mobile,
        stud_address: student.stud_address,
        token: generateToken(student._id),
      });
    } else {
      res.status(400);
      throw new Error("Incorrect password");
    }
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

//@desc Register a new student
//@route POST  /api/student/register
//@access Public
const registerStudent = asyncHandler(async (req, res) => {
  const {
    stud_name,
    stud_email,
    password,
    stud_mobile,
    stud_address,
    stud_pic,
    course,
    exam,
  } = req.body;

  const studentExists = await Student.findOne({ stud_email });

  if (studentExists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    stud_name,
    stud_email,
    password: hashedPassword,
    stud_mobile,
    stud_address,
    stud_pic,
    course,
    exam,
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      stud_name: student.stud_name,
      stud_email: student.stud_email,
      stud_mobile: student.stud_mobile,
      stud_address: student.stud_address,
      stud_pic: student.stud_pic,
      course: student.course,
      exam: student.exam,
      active: student.active,
      cKey: student.cKey,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid student data");
  }
});

export { authStudent, registerStudent };
