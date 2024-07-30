import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { listCourses } from "../../redux/actions/courseActions";
import {
  createExam,
  deleteExam,
  listTeacherExams,
  updateExam,
} from "../../redux/actions/examActions";

import Footer from "../../components/Footer";
import TestForTeacher from "../../components/teacher-tests/TestForTeacher";

function TeacherTests() {
  const [exam_name, setExamName] = useState("");
  const [course, setCourse] = useState("");
  const [total_marks, setTotalMarks] = useState("");
  const [total_time, setTotalTime] = useState("");

  const dispatch = useDispatch();

  const examCreate = useSelector((state) => state.examCreate);
  const { loading, error, exam } = examCreate;

  const examList = useSelector((state) => state.examList);
  const { loading: listLoading, error: listError, exams } = examList;

  const examUpdate = useSelector((state) => state.examUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = examUpdate;

  const examDelete = useSelector((state) => state.examDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = examDelete;

  const courseList = useSelector((state) => state.courseList);
  const { loading: courseLoading, error: courseError, courses } = courseList;

  useEffect(() => {
    dispatch(listTeacherExams());
    dispatch(listCourses());
  }, [dispatch, exam, updateSuccess, deleteSuccess]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      createExam({
        exam_name,
        course,
        total_marks,
        total_time,
      })
    );
    setExamName("");
    setCourse("");
    setTotalMarks("");
    setTotalTime("");
  };

  const updateHandler = (id, examData) => {
    dispatch(updateExam(id, examData));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      dispatch(deleteExam(id));
    }
  };

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {error && <Alert type="danger">{error}</Alert>}
              {exam && <Alert type="success">Exam added successfully</Alert>}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Manage Tests
              </h1>
              <div className="col-md-8 mx-auto my-5 text-center text-dark">
                <form
                  className="contact_form row d-flex justify-content-center mx-0"
                  onSubmit={submitHandler}
                >
                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="exam_name"
                        name="exam_name"
                        placeholder="Exam name*"
                        value={exam_name}
                        onChange={(e) => setExamName(e.target.value)}
                        required
                      />
                      <label htmlFor="exam_name light-300">Exam Name*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <select
                        className="form-select form-control form-control-lg light-300"
                        id="course"
                        name="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                      >
                        <option value="">Select Course*</option>
                        {courses &&
                          courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.course_name}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="course light-300">Select Course*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="total_marks"
                        name="total_marks"
                        placeholder="Total Marks*"
                        value={total_marks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        required
                      />
                      <label htmlFor="total_marks light-300">
                        Total Marks*
                      </label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="total_time"
                        name="total_time"
                        placeholder="Time in mins*"
                        value={total_time}
                        onChange={(e) => setTotalTime(e.target.value)}
                        required
                      />
                      <label htmlFor="total_time light-300">
                        Time in Mins*
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12 col-10 mx-auto my-3">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                    >
                      Save Exam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light pt-sm-0 py-5">
        {listLoading ? (
          <Spinner />
        ) : listError ? (
          <Alert type="danger">{listError}</Alert>
        ) : exams.length === 0 ? (
          <div className="text-center">
            <h3>No exams found</h3>
            <p>Create a new exam to get started.</p>
          </div>
        ) : (
          exams.map((exam) => (
            <TestForTeacher
              key={exam._id}
              testID={exam._id}
              exam_name={exam.exam_name}
              no_of_questions={exam.no_of_questions}
              total_marks={exam.total_marks}
              total_time={exam.total_time}
              course={exam.course.course_name}
              onUpdate={updateHandler}
              onDelete={deleteHandler}
            />
          ))
        )}
      </section>
      <Footer />
    </div>
  );
}

export default TeacherTests;
