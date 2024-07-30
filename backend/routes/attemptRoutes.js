import express from "express";
import {
  getAttemptQuestions,
  startAttempt,
  submitAttempt,
} from "../controllers/attemptController.js";
import { protectStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/start").post(protectStudent, startAttempt);
router.route("/:id/questions").get(protectStudent, getAttemptQuestions);
router.route("/:id/submit").post(protectStudent, submitAttempt);

export default router;
