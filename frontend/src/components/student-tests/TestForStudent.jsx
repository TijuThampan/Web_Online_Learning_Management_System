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
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Exam Name: {exam_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Course: {course}
              </h6>
              <p className="card-text">
                <strong>Number of Questions:</strong> {no_of_questions}
                <br />
                <strong>Total Marks:</strong> {total_marks}
                <br />
                <strong>Time Limit:</strong> {total_time} minutes
              </p>
              {status === "pending" && (
                <button
                  className="btn btn-primary"
                  onClick={handleStartAttempt}
                >
                  Start Attempt
                </button>
              )}
              {status === "attempted" && (
                <p className="text-success">Exam Attempted</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestForStudent;
