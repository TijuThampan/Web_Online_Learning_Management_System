import {
  ATTEMPT_DELETE_FAIL,
  ATTEMPT_DELETE_REQUEST,
  ATTEMPT_DELETE_SUCCESS,
  ATTEMPT_GET_ALL_FAIL,
  ATTEMPT_GET_ALL_REQUEST,
  ATTEMPT_GET_ALL_SUCCESS,
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

import axios from "axios";

export const startAttempt = (examId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTEMPT_START_REQUEST,
    });

    const {
      studentLogin: { studentInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/attempt/start`, { examId }, config);

    dispatch({
      type: ATTEMPT_START_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: ATTEMPT_START_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAttemptQuestions =
  (attemptId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATTEMPT_QUESTIONS_REQUEST,
      });

      const {
        studentLogin: { studentInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${studentInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/attempt/${attemptId}/questions`,
        config
      );

      dispatch({
        type: ATTEMPT_QUESTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ATTEMPT_QUESTIONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const submitAttempt =
  (attemptId, answers) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ATTEMPT_SUBMIT_REQUEST,
      });

      const {
        studentLogin: { studentInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${studentInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/attempt/${attemptId}/submit`,
        { answers },
        config
      );

      dispatch({
        type: ATTEMPT_SUBMIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ATTEMPT_SUBMIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllAttempts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTEMPT_GET_ALL_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/attempt/all-attempts`, config);

    dispatch({
      type: ATTEMPT_GET_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTEMPT_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAttempt = (attemptId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTEMPT_DELETE_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    await axios.delete(`/api/attempt/${attemptId}`, config);

    dispatch({
      type: ATTEMPT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ATTEMPT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
