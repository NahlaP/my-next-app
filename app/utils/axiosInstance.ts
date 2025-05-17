
// import axios from 'axios';

// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     Authorization: token ? `Bearer ${token}` : '',
//   },
// });

// export default axiosInstance;




import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

// Add request interceptor to inject token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
