import {
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_SIGNOUT,
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
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

export const loginAdminrReducer = (user = authData, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...user,
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('userInfo', encodeData(action.payload));
      return {
        ...user,
        loading: false,
        user: action.payload,
      };
    case ADMIN_LOGIN_ERROR:
      return {
        ...user,
        loading: false,
        error: action.payload,
      };
    case ADMIN_SIGNOUT:
      localStorage.removeItem('userInfo');
      return {
        ...user,
        loading: false,
      };
    default:
      return user;
  }
};

export const getAllUsersReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
