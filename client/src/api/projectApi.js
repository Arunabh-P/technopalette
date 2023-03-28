import axios from 'axios';
import { BACKEND_URL } from '../constants/url';

const API = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
});

export const registerUser = ({ name, email, phone, password }) =>
  API.post(`/register`, { name, email, phone, password });
