import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout as teacherLogout } from "../../../redux/actions/teacherActions";

export function TeacherNavbar() {
  const dispatch = useDispatch();

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherLogin;

  const logoutHandler = () => {
    if (teacherInfo) {
      dispatch(teacherLogout());
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink
            className="navbar-brand fs-3 fw-bold"
            to="/teacher/dashboard"
            exact
          >
            <i className="bi-building text-success"></i>
            <span className="text-dark">L</span>
            <span className="text-primary">E</span>
            <span className="text-dark">M</span>
            <span className="text-primary">N</span>
            <span className="text-primary">O</span>
            <span className="text-dark">S</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink className="nav-link" to="/teacher/dashboard" exact>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teacher/courses" exact>
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teacher/tests" exact>
                  Exams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teacher/results" exact>
                  Results
                </NavLink>
              </li>
            </ul>
            <div className="navbar align-self-center d-flex">
              {teacherInfo && (
                <>
                  <NavLink
                    className="nav-link text-success pe-2"
                    to="/teacher/dashboard"
                    exact
                    title="Dashboard"
                  >
                    Hi, <strong>{teacherInfo.tchr_name}</strong>
                  </NavLink>

                  <NavLink
                    className="nav-link text-danger"
                    onClick={logoutHandler}
                    to="/"
                    title="Logout"
                  >
                    <i className="bi-box-arrow-right" role="img"></i> Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
