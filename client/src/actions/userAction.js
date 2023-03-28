import * as api from '../api/projectApi';
import {
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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
      console.log(data, 'data here');
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
