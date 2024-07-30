import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enrollCourse } from "../../redux/actions/courseActions";

function CourseForStudent({ courses }) {
  const dispatch = useDispatch();

  const handleEnroll = (courseId) => {
    dispatch(enrollCourse(courseId));
  };

  return (
    <div className="container text-center">
      {courses.map((course) => (
        <div
          className="row col-10 m-auto d-flex shadow rounded overflow-hidden bg-light my-5"
          key={course._id}
        >
          <div className="col-md-3 text-center bg-info text-light py-4">
            <i className="display-1 bi-journal-bookmark-fill"></i>
            <h5 className="semi-bold-600 pb-4 light-300">
              {course.course_name}
            </h5>
          </div>
          <div className="col-md-6 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
            <ul className="text-left px-4 list-unstyled mb-0 light-300">
              <li>
                <i className="bi-circle-fill me-2"></i>
                {course.course_outline}
              </li>
              <li>
                <i className="bi-circle-fill me-2"></i>Total Units:{" "}
                {course.total_units}
              </li>
              <li>
                <i className="bi-circle-fill me-2"></i>Students:{" "}
                {course.total_students}
              </li>
            </ul>
          </div>
          <div className="col-md-3 text-end pt-3 d-flex align-items-center">
            <div className="w-100 light-300 d-flex d-md-block justify-content-between">
              <p>
                <NavLink
                  to={`/student/course/${course._id}`}
                  className="btn rounded-pill px-4 btn-outline-primary mb-3"
                >
                  View Details
                </NavLink>
              </p>
              {!course.isEnrolled ? (
                <p>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="btn rounded-pill px-4 btn-outline-success"
                  >
                    Enroll
                  </button>
                </p>
              ) : (
                <p className="text-success">Enrolled</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseForStudent;
