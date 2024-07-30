import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    stud_name: {
      type: String,
      required: true,
    },
    stud_email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stud_mobile: {
      type: Number,
      required: true,
    },
    stud_address: {
      type: String,
      required: true,
    },
    stud_pic: {
      type: String,
      required: false,
    },
    course: {
      type: Array,
      required: false,
    },
    exam: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
