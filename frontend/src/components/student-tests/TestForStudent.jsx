import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAttempt } from "../../redux/actions/attemptActions";

const TestForStudent = ({
  testID,
  exam_name,
  no_of_questions,
  total_marks,
  total_time,
  course,
  status,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartAttempt = () => {
    dispatch(startAttempt(testID))
      .then((attempt) => {
        navigate(`/student/exam/${testID}/attempt/${attempt._id}`);
      })
      .catch((error) => {
        console.error("Error starting attempt:", error);
      });
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title mb-0">{exam_name}</h5>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">Course: {course}</h6>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">
            <strong>Number of Questions:</strong> {no_of_questions}
          </li>
          <li className="list-group-item">
            <strong>Total Marks:</strong> {total_marks}
          </li>
          <li className="list-group-item">
            <strong>Time Limit:</strong> {total_time} minutes
          </li>
        </ul>
        {status === "pending" && (
          <button className="btn btn-primary" onClick={handleStartAttempt}>
            Start Attempt
          </button>
        )}
        {status === "attempted" && (
          <p className="text-success mb-0">Exam Attempted</p>
        )}
      </div>
    </div>
  );
};

export default TestForStudent;
