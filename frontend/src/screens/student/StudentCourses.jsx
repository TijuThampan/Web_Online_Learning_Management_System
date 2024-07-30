import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { listCourses } from "../../redux/actions/courseActions";

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
      <div className="container d-flex justify-content-between border-b align-items-center py-4">
        <h2>Available Courses</h2>
      </div>

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
    </div>
  );
}

export default StudentCourses;
