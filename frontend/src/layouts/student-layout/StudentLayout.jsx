import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { StudentNavbar } from "./components/StudentNavbar";

export function StudentLayout() {
  const navigate = useNavigate();
  const { studentInfo } = useSelector((state) => state.studentLogin);

  useEffect(() => {
    if (!studentInfo) {
      navigate("/");
    }
  }, [studentInfo, navigate]);

  return (
    <>
      <StudentNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
