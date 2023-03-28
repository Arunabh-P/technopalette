import axios from 'axios';
import { BACKEND_URL } from '../constants/url';

const API = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
});

export const registerUser = ({ name, email, phone, password }) =>
  API.post(`/register`, { name, email, phone, password });

export const loginUser = ({ email, password }) =>
  API.post(`/login`, { email, password });

export const updateProfile = ({
  name,
  email,
  phone,
  photo,
  height,
  weight,
  residence,
  familyInfo,
  userId,
}) =>
  API.put(`/profileUpdate`, {
    name,
    email,
    phone,
    photo,
    height,
    weight,
    residence,
    familyInfo,
    userId,
  });

// admin
export const loginAdmin = ({ email, password }) =>
  API.post(`/admin`, { email, password });

export const fetchUsers = () => API.get(`/users`);

export const logoutUser = () => API.get(`/logout`);
