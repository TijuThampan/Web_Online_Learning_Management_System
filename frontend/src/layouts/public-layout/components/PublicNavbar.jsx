import React from "react";
import { NavLink } from "react-router-dom";

export function PublicNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <NavLink className="navbar-brand fs-3 fw-bold" to="/" exact>
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
                <NavLink className="nav-link" aria-current="page" to="/" exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" exact>
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/courses" exact>
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tests" exact>
                  Tests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" exact>
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/notices" exact>
                  Notices
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/student/login"
                  exact
                  title="Student"
                >
                  <i className="bi-person-badge text-primary" role="img"></i>
                  Student Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/teacher/login"
                  exact
                  title="Teacher"
                >
                  <i className="bi-person-circle text-success" role="img"></i>
                  Teacher Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
