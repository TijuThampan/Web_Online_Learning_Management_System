import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import {
  createCourse,
  getSpecificCourses,
} from "../../redux/actions/courseActions";

import CourseForTeacher from "../../components/teacher-courses/CourseForTeacher";

function TeacherCourses() {
  const [coursename, setCourseName] = useState("");
  const [units, setUnits] = useState("");
  const [outline, setOutline] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const courseCreate = useSelector((state) => state.courseCreate);
  const { loading, error, course } = courseCreate;

  const specificCourseList = useSelector((state) => state.specificCourseList);
  let { loading: scLoading, error: scError, spcfcourses } = specificCourseList;

  const courseUpdate = useSelector((state) => state.courseUpdate);
  const { loading: cuLoading, error: cuError, updatedCourse } = courseUpdate;

  const courseDelete = useSelector((state) => state.courseDelete);
  const { loading: dcLoading, error: dcError, courseDeleted } = courseDelete;

  useEffect(() => {
    dispatch(getSpecificCourses());
  }, [dispatch, course, updatedCourse, courseDeleted]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createCourse(coursename, outline, units));
    setCourseName("");
    setUnits("");
    setOutline("");
    setIsModalOpen(false);
  };

  const isLoading = loading || scLoading || cuLoading || dcLoading;

  return (
    <div>
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>Manage Courses</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Course
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Course</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="coursename" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="coursename"
                      value={coursename}
                      onChange={(e) => setCourseName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="units" className="form-label">
                      Units
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="units"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="outline" className="form-label">
                      Course Outline
                    </label>
                    <textarea
                      className="form-control"
                      id="outline"
                      value={outline}
                      onChange={(e) => setOutline(e.target.value)}
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Course
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : !spcfcourses || spcfcourses.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            You have not created any course!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <CourseForTeacher spcfcourses={spcfcourses} />
        </section>
      )}
    </div>
  );
}

export default TeacherCourses;
