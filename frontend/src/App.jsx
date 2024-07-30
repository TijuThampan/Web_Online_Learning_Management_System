import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import About from "./screens/About";
import Courses from "./screens/Courses";
import Tests from "./screens/Tests";
import Contact from "./screens/Contact";
import Notices from "./screens/Notices";
import TeacherLogin from "./screens/teacher/TeacherLogin";
import TeacherRegister from "./screens/teacher/TeacherRegister";
import TeacherDash from "./screens/teacher/TeacherDash";
import TeacherCourses from "./screens/teacher/TeacherCourses";
import TeacherTests from "./screens/teacher/TeacherTests";
import AddQuestion from "./screens/teacher/AddQuestion";
import StudentLogin from "./screens/student/StudentLogin";
import StudentRegister from "./screens/student/StudentRegister";
import StudentDash from "./screens/student/StudentDash";
import "./App.css";
import StudentCourses from "./screens/student/StudentCourses";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/teacher">
            <Route path="login" element={<TeacherLogin />} />
            <Route path="register" element={<TeacherRegister />} />
            <Route path="dashboard" element={<TeacherDash />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="tests" element={<TeacherTests />} />
            <Route path="add-question" element={<AddQuestion />} />
          </Route>
          <Route path="/student">
            <Route path="login" element={<StudentLogin />} />
            <Route path="register" element={<StudentRegister />} />
            <Route path="dashboard" element={<StudentDash />} />
            <Route path="courses" element={<StudentCourses />} />
          </Route>
          {/* Add other routes as needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
