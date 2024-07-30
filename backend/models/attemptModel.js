import mongoose from "mongoose";

const attemptSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Question",
        },
        chosenAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    totalMarks: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["started", "submitted"],
      default: "started",
    },
  },
  {
    timestamps: true,
  }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt;
