import * as api from '../api/projectApi';
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/actionTypes';

export const registerUserAction =
  (name, email, phone, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await api.registerUser(
        name,
        email,
        phone,
        password,
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      return true;
    } catch (error) {
      dispatch({
        type: USER_REGISTER_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return false;
    }
  };

export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await api.loginUser(email, password);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    return true;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const updateProfileAction =
  (name, email, phone, photo, height, weight, residence, familyInfo, userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.updateProfile(
        name,
        email,
        phone,
        photo,
        height,
        weight,
        residence,
        familyInfo,
        userId,
        config
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      return true;
    } catch (error) {
      dispatch({
        type: USER_UPDATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return false;
    }
  };
