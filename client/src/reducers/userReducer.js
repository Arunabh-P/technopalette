import {
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/actionTypes';
import { encodeData, decodeData } from '../validations/encryptInfo';

let authData = { user: null, loading: false };
try {
  authData = localStorage.getItem('userInfo')
    ? {
        ...authData,
        user: decodeData(localStorage.getItem('userInfo')),
      }
    : { user: null };
} catch (error) {
  authData = {
    ...authData,
    user: null,
  };
  localStorage.removeItem('userInfo');
}

export const registerUserReducer = (
  state = {
    loading: true,
    user: authData,
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('userInfo', encodeData(action.payload));
      return {
        loading: false,
        user: action.payload,
      };
    case USER_REGISTER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
