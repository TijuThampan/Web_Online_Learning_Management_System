import express from "express";
import {
  createExam,
  deleteExam,
  getExamById,
  getTeacherExams,
  updateExam,
} from "../controllers/examController.js";
import { protectTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create").post(protectTeacher, createExam);
router.route("/teacher").get(protectTeacher, getTeacherExams);
router
  .route("/:id")
  .get(protectTeacher, getExamById)
  .put(protectTeacher, updateExam)
  .delete(protectTeacher, deleteExam);

export default router;
