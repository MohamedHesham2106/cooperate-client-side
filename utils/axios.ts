import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { getCookie } from './cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const jwtAccess = getCookie('jwt_access');

  if (jwtAccess) {
    config.headers.Authorization = `Bearer ${jwtAccess}`;
    return config;
  }
  return config;
});

export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};
