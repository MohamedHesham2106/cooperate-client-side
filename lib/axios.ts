import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosInstance;
