import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCourses } from "../../redux/actions/courseActions";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

import Footer from "../../components/Footer";
import CourseForStudent from "../../components/student-courses/CourseForStudent";

function StudentCourses() {
  const dispatch = useDispatch();

  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  return (
    <div>
      <section>
        <div id="page_banner2" className="banner-wrapper bg-light w-100 py-5">
          {/* <StudentNavs /> */}
          <div className="container text-light d-flex justify-content-center align-items-center py-5 p-0">
            <div className="banner-content col-lg-8 col-12 m-lg-auto text-center">
              {error && <Alert type="danger">{error}</Alert>}
              <h1 className="banner-heading display-3 pb-5 semi-bold-600 typo-space-line-center">
                Available Courses
              </h1>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : !courses || courses.length === 0 ? (
        <section className="bg-light text-center py-5 w-100 min__height">
          <h2>
            <i
              className="bi-exclamation-triangle text-danger mx-3"
              role="img"
            ></i>
            No courses available at the moment!
          </h2>
        </section>
      ) : (
        <section className="bg-light py-2">
          <CourseForStudent courses={courses} />
        </section>
      )}

      <Footer />
    </div>
  );
}

export default StudentCourses;
