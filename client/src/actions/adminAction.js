import * as api from '../api/projectApi';
import {
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from '../constants/actionTypes';

export const loginAdminAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const { data } = await api.loginAdmin(email, password);
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    let { data } = await api.fetchUsers();
    let usersData = data.users;
    dispatch({ type: GET_USERS_SUCCESS, payload: usersData });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_USERS_ERROR });
  }
};
