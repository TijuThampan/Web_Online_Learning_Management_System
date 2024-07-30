import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getExamDetails } from "../../redux/actions/examActions";
import {
  createQuestion,
  deleteQuestion,
  listExamQuestions,
  updateQuestion,
} from "../../redux/actions/questionActions";

function TeacherTestsQuestions() {
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [mark, setMark] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState({});

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
        question_text: questionText,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateQuestion(updatedQuestion._id, updatedQuestion));
    setIsModalOpen(false);
  };

  const handleDelete = (questionId) => {
    dispatch(deleteQuestion(questionId));
  };

  const openModal = (question) => {
    setUpdatedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const isLoading =
    loading || listLoading || updateLoading || deleteLoading || examLoading;

  return (
    <div>
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>Manage Questions</h2>
      </div>

      <div className="container  ">
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Add Question</h5>
            <button
              type="submit"
              className="btn btn-primary"
              form="addQuestionForm"
            >
              Save Question
            </button>
          </div>
          <div className="card-body">
            <form id="addQuestionForm" onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="questionText" className="form-label">
                  Question Text
                </label>
                <textarea
                  className="form-control"
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="option1" className="form-label">
                      Option 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="option1"
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="option2" className="form-label">
                      Option 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="option2"
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label">
                      Correct Answer
                    </label>
                    <select
                      className="form-select"
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    >
                      <option value="">Select Correct Answer</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                      <option value="option4">Option 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="option3" className="form-label">
                      Option 3
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="option3"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="option4" className="form-label">
                      Option 4
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="option4"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mark" className="form-label">
                      Mark
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mark"
                      value={mark}
                      onChange={(e) => setMark(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : !questions || questions.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            No questions found for this exam!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Correct Answer</th>
                  <th>Mark</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question._id}>
                    <td>{index + 1}</td>
                    <td>{question.question_text}</td>
                    <td>
                      1. {question.option1}
                      <br />
                      2. {question.option2}
                      <br />
                      3. {question.option3}
                      <br />
                      4. {question.option4}
                    </td>
                    <td>{question.answer}</td>
                    <td>{question.mark}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openModal(question)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(question._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="question_text" className="form-label">
                      Question Text
                    </label>
                    <textarea
                      className="form-control"
                      id="question_text"
                      name="question_text"
                      value={updatedQuestion.question_text}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="option1" className="form-label">
                          Option 1
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option1"
                          name="option1"
                          value={updatedQuestion.option1}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="option2" className="form-label">
                          Option 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option2"
                          name="option2"
                          value={updatedQuestion.option2}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="answer" className="form-label">
                          Correct Answer
                        </label>
                        <select
                          className="form-select"
                          id="answer"
                          name="answer"
                          value={updatedQuestion.answer}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Correct Answer</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="option3" className="form-label">
                          Option 3
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option3"
                          name="option3"
                          value={updatedQuestion.option3}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="option4" className="form-label">
                          Option 4
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option4"
                          name="option4"
                          value={updatedQuestion.option4}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mark" className="form-label">
                          Mark
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="mark"
                          name="mark"
                          value={updatedQuestion.mark}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherTestsQuestions;
