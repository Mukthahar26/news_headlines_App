import axios from 'axios';
import Config from 'react-native-config';
import logger from '../utilities/logger';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthenticationToken = (token: string) =>
  (axiosInstance.defaults.headers.common['Authorization'] = `bearer ${token}`);

export const fetchGetRequest = async (url: string) => {
  const result = await axiosInstance.get(url);
  return result;
};

export const fetchPostRequest = async (url: string) => {
  const result = await axiosInstance.post(url);
  return result;
};

axiosInstance.interceptors.request.use(
  request => {
    logger.log('request url :', request.url);
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
