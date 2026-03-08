import axios from 'axios';
import { config } from '../config';

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage to every request if available
axiosInstance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default axiosInstance;
