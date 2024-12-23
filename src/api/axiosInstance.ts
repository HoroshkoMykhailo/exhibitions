import axios from 'axios';
import { BackendUrl } from '~/constants/constants';

const axiosInstance = axios.create({
  baseURL: BackendUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

export default axiosInstance;
