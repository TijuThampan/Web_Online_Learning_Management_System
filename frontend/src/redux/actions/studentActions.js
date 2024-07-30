import {
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
} from "../constants/studentConstants";

import axios from "axios";

export const login = (stud_email, password) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/student/login",
      {
        stud_email,
        password,
      },
      config
    );

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("studentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("studentInfo");

  dispatch({
    type: STUDENT_LOGOUT,
  });
};

export const register =
  (name, email, password, phone, address) => async (dispatch) => {
    try {
      dispatch({
        type: STUDENT_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/student/register",
        {
          stud_name: name,
          stud_email: email,
          password,
          stud_mobile: phone,
          stud_address: address,
        },
        config
      );

      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: STUDENT_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("studentInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STUDENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
