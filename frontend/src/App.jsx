import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { PublicLayout } from "./layouts/public-layout/PublicLayout";
import { StudentLayout } from "./layouts/student-layout/StudentLayout";
import { TeacherLayout } from "./layouts/teacher-layout/TeacherLayout";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Courses from "./screens/Courses";
import Home from "./screens/Home";
import Notices from "./screens/Notices";
import StudentAttempt from "./screens/student/StudentAttempt";
import StudentCourses from "./screens/student/StudentCourses";
import StudentDash from "./screens/student/StudentDash";
import StudentLogin from "./screens/student/StudentLogin";
import StudentRegister from "./screens/student/StudentRegister";
import StudentTests from "./screens/student/StudentTests";
import TeacherCourses from "./screens/teacher/TeacherCourses";
import TeacherDash from "./screens/teacher/TeacherDash";
import TeacherLogin from "./screens/teacher/TeacherLogin";
import TeacherRegister from "./screens/teacher/TeacherRegister";
import TeacherTests from "./screens/teacher/TeacherTests";
import TeacherTestsQuestions from "./screens/teacher/TeacherTestsQuestions";
import Tests from "./screens/Tests";

export function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher/register" element={<TeacherRegister />} />

            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
          </Route>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route path="dashboard" element={<TeacherDash />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="tests" element={<TeacherTests />} />
            <Route
              path="tests-questions/:examId"
              element={<TeacherTestsQuestions />}
            />
          </Route>
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDash />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="tests" element={<StudentTests />} />
            <Route
              path="exam/:examId/attempt/:attemptId"
              element={<StudentAttempt />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}
