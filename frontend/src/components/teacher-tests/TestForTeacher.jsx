import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteExam, updateExam } from "../../redux/actions/examActions";

function TestForTeacher({ exams }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const dispatch = useDispatch();

  const handleUpdate = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteExam(id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateExam(
        selectedExam.exam_name,
        selectedExam.total_marks,
        selectedExam.total_time,
        selectedExam._id
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {exams.map((exam) => (
          <div className="col-md-4 mb-4" key={exam._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{exam.exam_name}</h5>
                <ul className="list-unstyled">
                  <li>Course: {exam.course.course_name}</li>
                  <li>Total Marks: {exam.total_marks}</li>
                  <li>Total Time: {exam.total_time} mins</li>
                </ul>
              </div>
              <div className="card-footer">
                <div className="row g-2">
                  <div className="col-4">
                    <NavLink
                      to={`/teacher/tests-questions/${exam._id}`}
                      className="btn btn-success w-100"
                    >
                      Questions
                    </NavLink>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => handleUpdate(exam)}
                      className="btn btn-primary w-100"
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="btn btn-danger w-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
                <h5 className="modal-title">Update Test</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="examName" className="form-label">
                      Test Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="examName"
                      value={selectedExam.exam_name}
                      onChange={(e) =>
                        setSelectedExam({
                          ...selectedExam,
                          exam_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalMarks" className="form-label">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalMarks"
                      value={selectedExam.total_marks}
                      onChange={(e) =>
                        setSelectedExam({
                          ...selectedExam,
                          total_marks: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalTime" className="form-label">
                      Total Time (in minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalTime"
                      value={selectedExam.total_time}
                      onChange={(e) =>
                        setSelectedExam({
                          ...selectedExam,
                          total_time: e.target.value,
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

export default TestForTeacher;
