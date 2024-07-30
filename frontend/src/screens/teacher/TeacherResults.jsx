import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import {
  deleteAttempt,
  getAllAttempts,
} from "../../redux/actions/attemptActions";

function TeacherResults() {
  const dispatch = useDispatch();

  const attemptGetAll = useSelector((state) => state.attemptGetAll);
  const { loading, error, attempts } = attemptGetAll;

  const attemptDelete = useSelector((state) => state.attemptDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = attemptDelete;

  useEffect(() => {
    dispatch(getAllAttempts());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (attemptId) => {
    if (window.confirm("Are you sure you want to delete this attempt?")) {
      dispatch(deleteAttempt(attemptId));
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>Exam Results / Attempts</h2>
      </div>

      {loading ? (
        <Spinner />
      ) : !attempts || attempts.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            No attempts found!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <div className="container mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Exam Name</th>
                  <th>Course Name</th>
                  <th>Total Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt._id}>
                    <td>{attempt.student_name}</td>
                    <td>{attempt.exam_name}</td>
                    <td>{attempt.course_name}</td>
                    <td>{attempt.total_marks}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(attempt._id)}
                        disabled={deleteLoading}
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
      {error && <div className="alert alert-danger">{error}</div>}
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
    </div>
  );
}

export default TeacherResults;
