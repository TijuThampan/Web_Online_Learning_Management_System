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
    no_of_questions,
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
          <h5 className="semi-bold-600 pb-4 light-300">{exam_name}</h5>
        </div>
        <div className="col-md-6 d-flex align-items-center pl-5 pt-lg-0 pt-4 text-start">
          <ul className="text-left px-4 list-unstyled mb-0 light-300">
            <li>
              <i className="bi-circle-fill me-2"></i>
              Course: {course}
            </li>
            <li>
              <i className="bi-circle-fill me-2"></i>Questions:{" "}
              {no_of_questions}
            </li>
            <li>
              <i className="bi-circle-fill me-2"></i>Marks: {total_marks}, Time:{" "}
              {total_time}mins.
            </li>
            <li>
              <NavLink
                to={`/add_question/${testID}`}
                className="btn rounded-pill px-4 mt-3 btn-success"
              >
                Add Questions
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-md-3 text-end pt-3 d-flex align-items-center">
          <div className="w-100 light-300 d-flex d-md-block justify-content-between">
            <p>
              <button
                type="button"
                className="btn rounded-pill px-4 btn-outline-primary mb-3"
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
        <h5 className="modal-title">Update Test - {testID}</h5>
        <button
          onClick={closeModal}
          className="btn-close"
          aria-label="Close"
        ></button>
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
                  id="no_of_questions"
                  name="no_of_questions"
                  placeholder="No. of Questions*"
                  value={updatedExam.no_of_questions}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="no_of_questions light-300">Questions*</label>
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
