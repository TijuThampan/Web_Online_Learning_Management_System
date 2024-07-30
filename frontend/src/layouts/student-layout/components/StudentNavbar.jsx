import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout as studentLogout } from "../../../redux/actions/studentActions";

export function StudentNavbar() {
  const dispatch = useDispatch();

  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;

  const logoutHandler = () => {
    dispatch(studentLogout());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink
            className="navbar-brand fs-3 fw-bold"
            to="/student/dashboard"
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
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/student/dashboard"
                  exact
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student/courses" exact>
                  Courses
                </NavLink>
              </li>
            </ul>
            <div className="navbar align-self-center d-flex">
              {studentInfo ? (
                <>
                  <NavLink
                    className="nav-link text-success pe-2"
                    to="/student/dashboard"
                    exact
                    title="Dashboard"
                  >
                    Hi, <strong>{studentInfo.stud_name}</strong>
                  </NavLink>

                  <NavLink
                    className="nav-link  text-danger"
                    onClick={logoutHandler}
                    to="/"
                    title="Logout"
                  >
                    <i
                      className="bi-box-arrow-right text-danger"
                      role="img"
                    ></i>
                    Logout
                  </NavLink>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
