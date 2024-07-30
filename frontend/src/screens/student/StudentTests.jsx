import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { listEnrolledExams } from "../../redux/actions/examActions";

import Footer from "../../components/Footer";
import TestForStudent from "../../components/student-tests/TestForStudent";

function StudentTests() {
  const dispatch = useDispatch();

  const examEnrolledList = useSelector((state) => state.examEnrolledList);
  const { loading, error, exams } = examEnrolledList;

  useEffect(() => {
    dispatch(listEnrolledExams());
  }, [dispatch]);

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                My Exams
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
        ) : exams.length === 0 ? (
          <div className="text-center">
            <h3>No exams found</h3>
            <p>You are not enrolled in any exams at the moment.</p>
          </div>
        ) : (
          exams.map((exam) => (
            <TestForStudent
              key={exam._id}
              testID={exam._id}
              exam_name={exam.exam_name}
              no_of_questions={exam.no_of_questions}
              total_marks={exam.total_marks}
              total_time={exam.total_time}
              course={exam.course.course_name}
            />
          ))
        )}
      </section>
      <Footer />
    </div>
  );
}

export default StudentTests;
