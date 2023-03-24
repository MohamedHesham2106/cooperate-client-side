import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosInstance;

export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};
