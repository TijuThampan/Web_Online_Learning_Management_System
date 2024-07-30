import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { getStudentResults } from "../../redux/actions/examActions";

import Footer from "../../components/Footer";

function StudentResults() {
  const dispatch = useDispatch();

  const studentResults = useSelector((state) => state.studentResults);
  const { loading, error, results } = studentResults;

  useEffect(() => {
    dispatch(getStudentResults());
  }, [dispatch]);

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                My Results
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light pt-sm-0 py-5">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert type="danger">{error}</Alert>
        ) : results.length === 0 ? (
          <div className="text-center">
            <h3>No results found</h3>
            <p>You haven't completed any exams yet.</p>
          </div>
        ) : (
          <div className="container">
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
        )}
      </section>
      <Footer />
    </div>
  );
}

export default StudentResults;
