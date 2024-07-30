import {
  EXAM_CREATE_FAIL,
  EXAM_CREATE_REQUEST,
  EXAM_CREATE_SUCCESS,
  EXAM_DELETE_FAIL,
  EXAM_DELETE_REQUEST,
  EXAM_DELETE_SUCCESS,
  EXAM_DETAILS_FAIL,
  EXAM_DETAILS_REQUEST,
  EXAM_DETAILS_SUCCESS,
  EXAM_ENROLLED_DETAILS_FAIL,
  EXAM_ENROLLED_DETAILS_REQUEST,
  EXAM_ENROLLED_DETAILS_SUCCESS,
  EXAM_ENROLLED_LIST_FAIL,
  EXAM_ENROLLED_LIST_REQUEST,
  EXAM_ENROLLED_LIST_SUCCESS,
  EXAM_LIST_FAIL,
  EXAM_LIST_REQUEST,
  EXAM_LIST_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_SUCCESS,
} from "../constants/examConstants";

export const examCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXAM_CREATE_REQUEST:
      return { loading: true };
    case EXAM_CREATE_SUCCESS:
      return { loading: false, success: true, exam: action.payload };
    case EXAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
    case EXAM_LIST_REQUEST:
      return { loading: true, exams: [] };
    case EXAM_LIST_SUCCESS:
      return { loading: false, exams: action.payload };
    case EXAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examUpdateReducer = (state = { exam: {} }, action) => {
  switch (action.type) {
    case EXAM_UPDATE_REQUEST:
      return { loading: true };
    case EXAM_UPDATE_SUCCESS:
      return { loading: false, success: true, exam: action.payload };
    case EXAM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXAM_DELETE_REQUEST:
      return { loading: true };
    case EXAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examDetailsReducer = (state = { exam: {} }, action) => {
  switch (action.type) {
    case EXAM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EXAM_DETAILS_SUCCESS:
      return { loading: false, exam: action.payload };
    case EXAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examEnrolledListReducer = (state = { exams: [] }, action) => {
  switch (action.type) {
    case EXAM_ENROLLED_LIST_REQUEST:
      return { loading: true, exams: [] };
    case EXAM_ENROLLED_LIST_SUCCESS:
      return { loading: false, exams: action.payload };
    case EXAM_ENROLLED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const examEnrolledDetailsReducer = (state = { exam: {} }, action) => {
  switch (action.type) {
    case EXAM_ENROLLED_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EXAM_ENROLLED_DETAILS_SUCCESS:
      return { loading: false, exam: action.payload };
    case EXAM_ENROLLED_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
