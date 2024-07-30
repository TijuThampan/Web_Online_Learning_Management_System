import {
  ATTEMPT_QUESTIONS_FAIL,
  ATTEMPT_QUESTIONS_REQUEST,
  ATTEMPT_QUESTIONS_SUCCESS,
  ATTEMPT_START_FAIL,
  ATTEMPT_START_REQUEST,
  ATTEMPT_START_SUCCESS,
  ATTEMPT_SUBMIT_FAIL,
  ATTEMPT_SUBMIT_REQUEST,
  ATTEMPT_SUBMIT_SUCCESS,
} from "../constants/attemptConstants";

export const attemptStartReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTEMPT_START_REQUEST:
      return { loading: true };
    case ATTEMPT_START_SUCCESS:
      return { loading: false, success: true, attempt: action.payload };
    case ATTEMPT_START_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const attemptQuestionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ATTEMPT_QUESTIONS_REQUEST:
      return { loading: true, questions: [] };
    case ATTEMPT_QUESTIONS_SUCCESS:
      return { loading: false, questions: action.payload };
    case ATTEMPT_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const attemptSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTEMPT_SUBMIT_REQUEST:
      return { loading: true };
    case ATTEMPT_SUBMIT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ATTEMPT_SUBMIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
