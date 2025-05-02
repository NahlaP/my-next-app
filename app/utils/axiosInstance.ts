// utils/axiosInstance.ts
import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default axiosInstance;
