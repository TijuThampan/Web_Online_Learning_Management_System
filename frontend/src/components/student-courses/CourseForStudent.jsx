import React from "react";
import { useDispatch } from "react-redux";
import { enrollCourse } from "../../redux/actions/courseActions";

function CourseForStudent({ courses }) {
  const dispatch = useDispatch();

  const handleEnroll = (courseId) => {
    dispatch(enrollCourse(courseId));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.course_name}</h5>
                <p className="card-text">Outline: {course.course_outline}</p>
                <ul className="list-unstyled">
                  <li>Total Units: {course.total_units}</li>
                  <li>Students Enrolled: {course.total_students}</li>
                </ul>
              </div>
              <div className="card-footer">
                {!course.isEnrolled ? (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="btn btn-primary w-100"
                  >
                    Enroll
                  </button>
                ) : (
                  <p className="text-success mb-0">Enrolled</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseForStudent;
