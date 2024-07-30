import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { TeacherNavbar } from "./components/TeacherNavbar";

export function TeacherLayout() {
  const navigate = useNavigate();
  const { teacherInfo } = useSelector((state) => state.teacherLogin);

  useEffect(() => {
    if (!teacherInfo) {
      navigate("/");
    }
  }, [teacherInfo, navigate]);

  return (
    <>
      <TeacherNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
