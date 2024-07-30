import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { getStudentResults } from "../../redux/actions/examActions";

function StudentResults() {
  const dispatch = useDispatch();

  const studentResults = useSelector((state) => state.studentResults);
  const { loading, error, results } = studentResults;

  useEffect(() => {
    dispatch(getStudentResults());
  }, [dispatch]);

  return (
    <div>
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>My Results</h2>
      </div>

      {loading ? (
        <Spinner />
      ) : !results || results.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            You haven't completed any exams yet!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <div className="container mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Course Name</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.exam_name}</td>
                    <td>{result.course_name}</td>
                    <td>{result.total_marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default StudentResults;
