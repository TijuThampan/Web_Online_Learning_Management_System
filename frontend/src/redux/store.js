import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

import {
  attemptDeleteReducer,
  attemptGetAllReducer,
  attemptQuestionsReducer,
  attemptStartReducer,
  attemptSubmitReducer,
} from "./reducers/attemptReducers";
import {
  courseCreateReducer,
  courseDeleteReducer,
  courseEnrollReducer,
  courseListReducer,
  courseUpdateReducer,
  specificCourseListReducer,
} from "./reducers/courseReducers";
import {
  examCreateReducer,
  examDeleteReducer,
  examDetailsReducer,
  examEnrolledDetailsReducer,
  examEnrolledListReducer,
  examListReducer,
  examUpdateReducer,
  studentResultsReducer,
} from "./reducers/examReducers";
import {
  questionCreateReducer,
  questionDeleteReducer,
  questionDetailsReducer,
  questionListReducer,
  questionUpdateReducer,
} from "./reducers/questionReducers";
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
  examCreate: examCreateReducer,
  examList: examListReducer,
  examUpdate: examUpdateReducer,
  examDelete: examDeleteReducer,
  examDetails: examDetailsReducer,
  examEnrolledList: examEnrolledListReducer,
  examEnrolledDetails: examEnrolledDetailsReducer,
  studentResults: studentResultsReducer,
  questionCreate: questionCreateReducer,
  questionList: questionListReducer,
  questionUpdate: questionUpdateReducer,
  questionDelete: questionDeleteReducer,
  questionDetails: questionDetailsReducer,
  attemptStart: attemptStartReducer,
  attemptQuestions: attemptQuestionsReducer,
  attemptSubmit: attemptSubmitReducer,
  attemptGetAll: attemptGetAllReducer,
  attemptDelete: attemptDeleteReducer,
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
