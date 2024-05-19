import { Alert } from 'react-native';

import axios, { AxiosError, AxiosRequestConfig, } from 'axios';

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Custom property for retry handling
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
});

instance.interceptors.response.use((response: any) => {
  return response;
}, async (error: AxiosError<any>) => {
  const request = error.config as MyAxiosRequestConfig; // Cast to custom config type

  if (!request._retry) {
    request._retry = true;
    return instance(request);
  }


  if (error.response && error.response.status === 400) {
    // Show alert for 400 (Bad Request) errors
    Alert.alert(error.response.data.message);
  } else {
    // Handle other errors (optional)
    Alert.alert('API request failed! An unexpected error occurred.');
  }

  return Promise.reject(error);
});

export default instance;