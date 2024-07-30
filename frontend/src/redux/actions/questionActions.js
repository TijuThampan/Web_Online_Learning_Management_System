import {
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
} from "../constants/questionConstants";

import axios from "axios";

export const createQuestion = (questionData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/question/create`,
      questionData,
      config
    );

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listExamQuestions = (examId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_LIST_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/question/exam/${examId}`, config);

    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateQuestion =
  (id, questionData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_UPDATE_REQUEST,
      });

      const {
        teacherLogin: { teacherInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/question/${id}`,
        questionData,
        config
      );

      dispatch({
        type: QUESTION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteQuestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DELETE_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    await axios.delete(`/api/question/${id}`, config);

    dispatch({
      type: QUESTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuestionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DETAILS_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/question/${id}`, config);

    dispatch({
      type: QUESTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
