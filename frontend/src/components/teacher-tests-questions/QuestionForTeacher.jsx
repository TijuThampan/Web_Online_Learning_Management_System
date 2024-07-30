import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility

function QuestionForTeacher({
  questionID,
  question_text,
  option1,
  option2,
  option3,
  option4,
  answer,
  mark,
  onUpdate,
  onDelete,
  dataIndex,
}) {
  const [updatedQuestion, setUpdatedQuestion] = useState({
    question_text,
    option1,
    option2,
    option3,
    option4,
    answer,
    mark,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(questionID, updatedQuestion);
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(questionID);
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
        <div className="col-md-2 text-center bg-info text-light py-4">
          <h3 className="semi-bold-600 pb-4 light-300">#{dataIndex + 1}</h3>
        </div>
        <div className="col-md-7 d-flex align-items-center pl-5 py-4 text-start">
          <ul className="text-left px-4 list-unstyled mb-0 light-300">
            <li className="mb-2">Question: {question_text}</li>
            <li>A) {option1}</li>
            <li>B) {option2}</li>
            <li>C) {option3}</li>
            <li className="mb-2">D) {option4}</li>
            <li className="text-success mb-2">Answer: {answer}</li>
            <li className="mb-2">Mark: {mark}</li>
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
        style={{
          content: customStyles.content,
          overlay: { overflow: "scroll" },
        }}
        contentLabel="Update Question Modal"
      >
        <div className="d-flex justify-content-between pb-2">
          <h5 className="modal-title">Update Question</h5>
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
                <textarea
                  className="form-control form-control-lg light-300"
                  id="question_text"
                  name="question_text"
                  placeholder="Question*"
                  value={updatedQuestion.question_text}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <label htmlFor="question_text light-300">Question*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg light-300"
                  id="option1"
                  name="option1"
                  placeholder="Option 1*"
                  value={updatedQuestion.option1}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="option1 light-300">Option 1*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg light-300"
                  id="option2"
                  name="option2"
                  placeholder="Option 2*"
                  value={updatedQuestion.option2}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="option2 light-300">Option 2*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg light-300"
                  id="option3"
                  name="option3"
                  placeholder="Option 3*"
                  value={updatedQuestion.option3}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="option3 light-300">Option 3*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg light-300"
                  id="option4"
                  name="option4"
                  placeholder="Option 4*"
                  value={updatedQuestion.option4}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="option4 light-300">Option 4*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <select
                  className="form-select form-control form-control-lg light-300"
                  id="answer"
                  name="answer"
                  value={updatedQuestion.answer}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Correct Answer*</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <label htmlFor="answer light-300">Correct Answer*</label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control form-control-lg light-300"
                  id="mark"
                  name="mark"
                  placeholder="Mark*"
                  value={updatedQuestion.mark}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="mark light-300">Mark*</label>
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

export default QuestionForTeacher;
