import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { listCourses } from "../../redux/actions/courseActions";
import { createExam, listTeacherExams } from "../../redux/actions/examActions";

import TestForTeacher from "../../components/teacher-tests/TestForTeacher";

function TeacherTests() {
  const [examName, setExamName] = useState("");
  const [course, setCourse] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const examCreate = useSelector((state) => state.examCreate);
  const { loading, error, exam } = examCreate;

  const examList = useSelector((state) => state.examList);
  const { loading: listLoading, error: listError, exams } = examList;

  const examUpdate = useSelector((state) => state.examUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    updatedExam,
  } = examUpdate;

  const examDelete = useSelector((state) => state.examDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    examDeleted,
  } = examDelete;

  const courseList = useSelector((state) => state.courseList);
  const { loading: courseLoading, error: courseError, courses } = courseList;

  useEffect(() => {
    dispatch(listTeacherExams());
    dispatch(listCourses());
  }, [dispatch, exam, updatedExam, examDeleted]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      createExam({
        exam_name: examName,
        course,
        total_marks: totalMarks,
        total_time: totalTime,
      })
    );
    setExamName("");
    setCourse("");
    setTotalMarks("");
    setTotalTime("");
    setIsModalOpen(false);
  };

  const isLoading =
    loading || listLoading || updateLoading || deleteLoading || courseLoading;

  return (
    <div>
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>Manage Exams</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Exam
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Exam</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="examName" className="form-label">
                      Test Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="examName"
                      value={examName}
                      onChange={(e) => setExamName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="course" className="form-label">
                      Course
                    </label>
                    <select
                      className="form-select"
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses &&
                        courses.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.course_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalMarks" className="form-label">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalMarks"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalTime" className="form-label">
                      Total Time (in minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalTime"
                      value={totalTime}
                      onChange={(e) => setTotalTime(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Exam
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : !exams || exams.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            You have not created any tests!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <TestForTeacher exams={exams} />
        </section>
      )}
    </div>
  );
}

export default TeacherTests;
