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
  EXAM_LIST_FAIL,
  EXAM_LIST_REQUEST,
  EXAM_LIST_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_SUCCESS,
} from "../constants/examConstants";

import axios from "axios";

export const createExam = (examData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/exam/create`, examData, config);

    dispatch({
      type: EXAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTeacherExams = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_LIST_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/exam/teacher`, config);

    dispatch({
      type: EXAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateExam = (id, examData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/exam/${id}`, examData, config);

    dispatch({
      type: EXAM_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_DELETE_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    await axios.delete(`/api/exam/${id}`, config);

    dispatch({
      type: EXAM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EXAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExamDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXAM_DETAILS_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/exam/${id}`, config);

    dispatch({
      type: EXAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
