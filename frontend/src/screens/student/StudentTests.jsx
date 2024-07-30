import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { listEnrolledExams } from "../../redux/actions/examActions";

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
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>My Exams</h2>
      </div>

      {loading ? (
        <Spinner />
      ) : !exams || exams.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            You are not enrolled in any exams at the moment!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <div className="container mt-4">
            <div className="row">
              {exams.map((exam) => (
                <div className="col-md-4 mb-4" key={exam._id}>
                  <TestForStudent
                    testID={exam._id}
                    exam_name={exam.exam_name}
                    no_of_questions={exam.no_of_questions}
                    total_marks={exam.total_marks}
                    total_time={exam.total_time}
                    course={exam.course.course_name}
                    status={exam.status}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default StudentTests;
