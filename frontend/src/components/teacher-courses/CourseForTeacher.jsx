import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCourse, updateCourse } from "../../redux/actions/courseActions";

function CourseForTeacher({ spcfcourses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const dispatch = useDispatch();

  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateCourse(
        selectedCourse.course_name,
        selectedCourse.course_outline,
        selectedCourse.total_units,
        selectedCourse._id
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {spcfcourses.map((course) => (
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
              <div className="card-footer d-flex justify-content-between">
                <button
                  onClick={() => handleUpdate(course)}
                  className="btn btn-primary w-100 me-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="btn btn-danger w-100 ms-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Course</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="courseName" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="courseName"
                      value={selectedCourse.course_name}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          course_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="courseOutline" className="form-label">
                      Course Outline
                    </label>
                    <textarea
                      className="form-control"
                      id="courseOutline"
                      value={selectedCourse.course_outline}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          course_outline: e.target.value,
                        })
                      }
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalUnits" className="form-label">
                      Total Units
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalUnits"
                      value={selectedCourse.total_units}
                      onChange={(e) =>
                        setSelectedCourse({
                          ...selectedCourse,
                          total_units: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseForTeacher;
