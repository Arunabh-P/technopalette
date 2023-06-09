import {
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
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
    user: [],
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
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

export const loginUserReducer = (user = authData, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...user,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('userInfo', encodeData(action.payload));
      return {
        ...user,
        loading: false,
        user: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...user,
        loading: false,
        error: action.payload,
      };
    case USER_SIGNOUT:
      localStorage.removeItem('userInfo');
      return {
        user: null,
        loading: false,
      };
    default:
      return user;
  }
};

export const updateProfileReducer = (
  state = {
    user: [],
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
