import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { getExamDetails } from "../../redux/actions/examActions";
import {
  createQuestion,
  deleteQuestion,
  listExamQuestions,
  updateQuestion,
} from "../../redux/actions/questionActions";

import Footer from "../../components/Footer";
import QuestionForTeacher from "../../components/teacher-tests-questions/QuestionForTeacher";

function TeacherTestsQuestions() {
  const [question_text, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [mark, setMark] = useState("");

  const dispatch = useDispatch();
  const { examId } = useParams();

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading, error, question } = questionCreate;

  const questionList = useSelector((state) => state.questionList);
  const { loading: listLoading, error: listError, questions } = questionList;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = questionUpdate;

  const questionDelete = useSelector((state) => state.questionDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = questionDelete;

  const examDetails = useSelector((state) => state.examDetails);
  const { loading: examLoading, error: examError, exam } = examDetails;

  useEffect(() => {
    dispatch(listExamQuestions(examId));
    dispatch(getExamDetails(examId));
  }, [dispatch, examId, question, updateSuccess, deleteSuccess]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      createQuestion({
        exam: examId,
        question_text,
        option1,
        option2,
        option3,
        option4,
        answer,
        mark,
      })
    );
    setQuestionText("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setMark("");
  };

  const updateHandler = (id, questionData) => {
    dispatch(updateQuestion(id, questionData));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {error && <Alert type="danger">{error}</Alert>}
              {question && (
                <Alert type="success">Question added successfully</Alert>
              )}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Manage Questions
              </h1>
              {examLoading ? (
                <Spinner />
              ) : examError ? (
                <Alert type="danger">{examError}</Alert>
              ) : (
                <div className="text-dark mb-4">
                  <h4>Exam: {exam.exam_name}</h4>
                  <p>Cource: {exam.course?.course_name}</p>
                  <p>Duration: {exam.total_time} minutes</p>
                  <p>Total Marks: {exam.total_marks}</p>
                </div>
              )}
              <div className="col-md-8 mx-auto my-5 text-center text-dark">
                <form
                  className="contact_form row d-flex justify-content-center mx-0"
                  onSubmit={submitHandler}
                >
                  <div className="col-10 col-lg-12 mb-4">
                    <div className="form-floating">
                      <textarea
                        className="form-control form-control-lg light-300"
                        id="question_text"
                        name="question_text"
                        placeholder="Question*"
                        value={question_text}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                      ></textarea>
                      <label htmlFor="question_text light-300">Question*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="option1"
                        name="option1"
                        placeholder="Option 1*"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        required
                      />
                      <label htmlFor="option1 light-300">Option 1*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="option2"
                        name="option2"
                        placeholder="Option 2*"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        required
                      />
                      <label htmlFor="option2 light-300">Option 2*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="option3"
                        name="option3"
                        placeholder="Option 3*"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                        required
                      />
                      <label htmlFor="option3 light-300">Option 3*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-lg light-300"
                        id="option4"
                        name="option4"
                        placeholder="Option 4*"
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                        required
                      />
                      <label htmlFor="option4 light-300">Option 4*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <select
                        className="form-select form-control form-control-lg light-300"
                        id="answer"
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                      >
                        <option value="">Select Correct Answer*</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                      </select>
                      <label htmlFor="answer light-300">Correct Answer*</label>
                    </div>
                  </div>

                  <div className="col-10 col-lg-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control form-control-lg light-300"
                        id="mark"
                        name="mark"
                        placeholder="Mark*"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        required
                      />
                      <label htmlFor="mark light-300">Mark*</label>
                    </div>
                  </div>

                  <div className="col-md-12 col-10 mx-auto my-3">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
                    >
                      Add Question
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
        ) : questions.length === 0 ? (
          <div className="text-center">
            <h3>No questions found</h3>
            <p>Add a new question to get started.</p>
          </div>
        ) : (
          questions.map((question, dataIndex) => (
            <QuestionForTeacher
              key={question._id}
              questionID={question._id}
              dataIndex={dataIndex}
              question_text={question.question_text}
              option1={question.option1}
              option2={question.option2}
              option3={question.option3}
              option4={question.option4}
              answer={question.answer}
              mark={question.mark}
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

export default TeacherTestsQuestions;
