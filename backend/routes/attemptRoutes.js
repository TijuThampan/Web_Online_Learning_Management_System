import express from "express";
import {
  deleteAttempt,
  getAllAttempts,
  getAttemptQuestions,
  startAttempt,
  submitAttempt,
} from "../controllers/attemptController.js";
import {
  protectStudent,
  protectTeacher,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/start").post(protectStudent, startAttempt);
router.route("/all-attempts").get(protectTeacher, getAllAttempts);

router.route("/:id/questions").get(protectStudent, getAttemptQuestions);
router.route("/:id/submit").post(protectStudent, submitAttempt);
router.route("/:id").delete(protectTeacher, deleteAttempt);

export default router;
