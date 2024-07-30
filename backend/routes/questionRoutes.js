import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getExamQuestions,
  getQuestionById,
  updateQuestion,
} from "../controllers/questionController.js";
import { protectTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectTeacher, createQuestion);
router.get("/exam/:examId", protectTeacher, getExamQuestions);
router.put("/:id", protectTeacher, updateQuestion);
router.delete("/:id", protectTeacher, deleteQuestion);
router.get("/:id", protectTeacher, getQuestionById);

export default router;
