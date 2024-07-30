import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { PublicNavbar } from "./components/PublicNavbar";

export function PublicLayout() {
  const navigate = useNavigate();
  const { teacherInfo } = useSelector((state) => state.teacherLogin);
  const { studentInfo } = useSelector((state) => state.studentLogin);

  useEffect(() => {
    if (teacherInfo) {
      navigate("/teacher/dashboard");
    } else if (studentInfo) {
      navigate("/student/dashboard");
    }
  }, [teacherInfo, studentInfo, navigate]);

  return (
    <>
      <PublicNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
