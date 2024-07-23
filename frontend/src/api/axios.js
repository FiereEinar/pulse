import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL, // Replace with your backend domain
  withCredentials: true,
});

export default axiosInstance;