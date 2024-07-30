import React, { useState } from "react";
import Modal from "react-modal";
import { NavLink } from "react-router-dom";

Modal.setAppElement("#root"); // Set the app element for accessibility

function TestForTeacher({
  testID,
  exam_name,
  no_of_questions,
  total_marks,
  total_time,
  course,
  onUpdate,
  onDelete,
}) {
  const [updatedExam, setUpdatedExam] = useState({
    exam_name,
    total_marks,
    total_time,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(testID, updatedExam);
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(testID);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="container py-5 text-center">
      <div className="row col-10 m-auto d-flex shadow rounded overflow-hidden bg-white">
        <div className="col-md-3 text-center bg-info text-light py-4">
          <i className="display-1 bi-pencil-square"></i>
        </div>
        <div className="col-md-6 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
          <ul className="text-left px-4 list-unstyled mb-0 light-300">
            <h5 className="semi-bold-600 pb-2 light-300">
              Exam Name: {exam_name}
            </h5>
            <li>Course: {course}</li>
            <li>Questions: {no_of_questions}</li>
            <li>
              Marks: {total_marks}, Time: {total_time}mins.
            </li>
          </ul>
        </div>
        <div className="col-md-3 text-end pt-3 d-flex align-items-center">
          <div className="w-100 light-300 d-flex d-md-block justify-content-between">
            <p>
              <NavLink
                to={`/teacher/tests-questions/${testID}`}
                className="btn rounded-pill px-4 btn-success"
              >
                Questions
              </NavLink>
            </p>
            <p>
              <button
                type="button"
                className="btn rounded-pill px-4 btn-outline-primary"
                onClick={openModal}
              >
                Update
              </button>
            </p>
            <p>
              <button
                onClick={handleDelete}
                className="btn rounded-pill px-4 btn-outline-warning"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update Test Modal"
      >
        <div className="d-flex justify-content-between pb-2">
          <h5 className="modal-title">Update Test</h5>
          <button
            onClick={closeModal}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <form className="row mx-auto w-100" onSubmit={handleUpdate}>
          <div className="modal-body">
            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg light-300"
                  id="exam_name"
                  name="exam_name"
                  placeholder="Test name*"
                  value={updatedExam.exam_name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="exam_name light-300">Test Name*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control form-control-lg light-300"
                  id="total_marks"
                  name="total_marks"
                  placeholder="Total Marks*"
                  value={updatedExam.total_marks}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="total_marks light-300">Total Marks*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control form-control-lg light-300"
                  id="total_time"
                  name="total_time"
                  placeholder="Time in mins*"
                  value={updatedExam.total_time}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="total_time light-300">Time in Mins*</label>
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
        </form>
      </Modal>
    </div>
  );
}

export default TestForTeacher;
