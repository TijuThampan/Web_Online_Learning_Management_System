import express from "express";
import {
  createExam,
  deleteExam,
  getEnrolledExamById,
  getEnrolledExams,
  getExamById,
  getTeacherExams,
  updateExam,
} from "../controllers/examController.js";
import {
  protectStudent,
  protectTeacher,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// routes for students
router.route("/enrolled").get(protectStudent, getEnrolledExams);
router.route("/enrolled/:id").get(protectStudent, getEnrolledExamById);

router.route("/create").post(protectTeacher, createExam);
router.route("/teacher").get(protectTeacher, getTeacherExams);
router
  .route("/:id")
  .get(protectTeacher, getExamById)
  .put(protectTeacher, updateExam)
  .delete(protectTeacher, deleteExam);

export default router;
