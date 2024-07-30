import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import {
  getAttemptQuestions,
  submitAttempt,
} from "../../redux/actions/attemptActions";

function StudentAttempt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { examId, attemptId } = useParams();

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const attemptQuestions = useSelector((state) => state.attemptQuestions);
  const { loading, error, questions } = attemptQuestions;

  const attemptSubmit = useSelector((state) => state.attemptSubmit);
  const {
    loading: submitLoading,
    error: submitError,
    success: submitSuccess,
  } = attemptSubmit;

  useEffect(() => {
    dispatch(getAttemptQuestions(attemptId));
  }, [dispatch, attemptId]);

  const handleAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (answer) => answer.question === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          question: questionId,
          chosenAnswer: optionId,
        };
        return updatedAnswers;
      } else {
        return [...prev, { question: questionId, chosenAnswer: optionId }];
      }
    });
  };

  const handleSubmitAttempt = () => {
    dispatch(submitAttempt(attemptId, selectedAnswers)).then(() => {
      navigate(`/student/results`);
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Exam Attempt</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type="danger">{error}</Alert>
      ) : (
        <>
          {questions?.map((question, index) => (
            <div key={question._id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Question {index + 1}</h5>
                <p className="card-text">{question.question_text}</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`option1-${question._id}`}
                    checked={selectedAnswers.some(
                      (answer) =>
                        answer.question === question._id &&
                        answer.chosenAnswer === "option1"
                    )}
                    onChange={() => handleAnswerSelect(question._id, "option1")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option1-${question._id}`}
                  >
                    {question.option1}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`option2-${question._id}`}
                    checked={selectedAnswers.some(
                      (answer) =>
                        answer.question === question._id &&
                        answer.chosenAnswer === "option2"
                    )}
                    onChange={() => handleAnswerSelect(question._id, "option2")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option2-${question._id}`}
                  >
                    {question.option2}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`option3-${question._id}`}
                    checked={selectedAnswers.some(
                      (answer) =>
                        answer.question === question._id &&
                        answer.chosenAnswer === "option3"
                    )}
                    onChange={() => handleAnswerSelect(question._id, "option3")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option3-${question._id}`}
                  >
                    {question.option3}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`option4-${question._id}`}
                    checked={selectedAnswers.some(
                      (answer) =>
                        answer.question === question._id &&
                        answer.chosenAnswer === "option4"
                    )}
                    onChange={() => handleAnswerSelect(question._id, "option4")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option4-${question._id}`}
                  >
                    {question.option4}
                  </label>
                </div>
              </div>
            </div>
          ))}
          {submitError && <Alert type="danger">{submitError}</Alert>}
          <button
            className="btn btn-primary"
            onClick={handleSubmitAttempt}
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit Attempt"}
          </button>
        </>
      )}
    </div>
  );
}

export default StudentAttempt;
