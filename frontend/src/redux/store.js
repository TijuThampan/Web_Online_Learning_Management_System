import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

import {
  courseCreateReducer,
  courseDeleteReducer,
  courseEnrollReducer,
  courseListReducer,
  courseUpdateReducer,
  specificCourseListReducer,
} from "./reducers/courseReducers";
import {
  studentLoginReducer,
  studentRegisterReducer,
} from "./reducers/studentReducers";
import {
  teacherLoginReducer,
  teacherRegisterReducer,
} from "./reducers/teacherReducers";

const reducer = combineReducers({
  teacherLogin: teacherLoginReducer,
  teacherRegister: teacherRegisterReducer,
  courseList: courseListReducer,
  courseCreate: courseCreateReducer,
  specificCourseList: specificCourseListReducer,
  courseUpdate: courseUpdateReducer,
  courseDelete: courseDeleteReducer,
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  courseEnroll: courseEnrollReducer,
});

const teacherInfoFromStorage = localStorage.getItem("teacherInfo")
  ? JSON.parse(localStorage.getItem("teacherInfo"))
  : null;

const studentInfoFromStorage = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : null;

const initialState = {
  teacherLogin: { teacherInfo: teacherInfoFromStorage },
  studentLogin: { studentInfo: studentInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
