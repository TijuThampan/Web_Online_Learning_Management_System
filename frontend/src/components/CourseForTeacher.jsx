import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCourse, deleteCourse } from "../redux/actions/courseActions";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
  },
};
function CourseForTeacher({ spcfcourses }) {
  const [courseName, setCourseName] = useState("");
  const [courseOutline, setCourseOutline] = useState("");
  const [courseUnits, setCourseUnits] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateCourse(courseName, courseOutline, courseUnits, courseId));
    setCourseName("");
    setCourseOutline("");
    setCourseUnits("");
    setCourseId("");
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  const openModal = (spcfcourse) => {
    setCourseName(spcfcourse.course_name);
    setCourseOutline(spcfcourse.course_outline);
    setCourseUnits(spcfcourse.total_units);
    setCourseId(spcfcourse._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container text-center">
      {spcfcourses.map((spcfcourse) => (
        <div
          className="row col-10 m-auto d-flex shadow rounded overflow-hidden bg-light my-5"
          key={spcfcourse._id}
        >
          <div className="col-md-3 text-center bg-info text-light py-4">
            <i className="display-1 bi-journal-bookmark-fill"></i>
            <h5 className="semi-bold-600 pb-4 light-300">
              {spcfcourse.course_name}
            </h5>
          </div>
          <div className="col-md-6 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
            <ul className="text-left px-4 list-unstyled mb-0 light-300">
              <li>
                <i className="bi-circle-fill me-2"></i>
                {spcfcourse.course_outline}
              </li>
              <li>
                <i className="bi-circle-fill me-2"></i>Total Units:{" "}
                {spcfcourse.total_units}
              </li>
              <li>
                <i className="bi-circle-fill me-2"></i>Students:{" "}
                {spcfcourse.total_students}
              </li>
            </ul>
          </div>
          <div className="col-md-3 text-end pt-3 d-flex align-items-center">
            <div className="w-100 light-300 d-flex d-md-block justify-content-between">
              <p>
                <button
                  type="button"
                  className="btn rounded-pill px-4 btn-outline-primary mb-3"
                  onClick={() => openModal(spcfcourse)}
                >
                  Update
                </button>
              </p>
              <p>
                <button
                  onClick={() => {
                    handleDelete(spcfcourse._id);
                  }}
                  exact
                  className="btn rounded-pill px-4 btn-outline-warning"
                >
                  Delete
                </button>
              </p>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Course Modal"
        style={customStyles}
      >
        <form className="row mx-auto w-100" onSubmit={submitHandler}>
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ justifyContent: "space-between", paddingBottom: 12 }}
            >
              <h5 className="modal-title" id="exampleModalLabel">
                Update Course - {courseName}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control form-control-lg light-300"
                    placeholder="Course name*"
                    value={courseName}
                    onChange={(event) => {
                      setCourseName(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="coursename light-300">Course Name*</label>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control form-control-lg light-300"
                    placeholder="No. of Units*"
                    value={courseUnits}
                    onChange={(event) => {
                      setCourseUnits(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="units light-300">Units*</label>
                </div>
              </div>
              <div className="mb-4">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg light-300"
                    placeholder="Course Outline*"
                    value={courseOutline}
                    onChange={(event) => {
                      setCourseOutline(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="outline light-300">Outline*</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info btn-lg rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CourseForTeacher;
