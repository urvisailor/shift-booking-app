import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/'
})

instance.interceptors.response.use(response => {
    return response
}, async (error) => {
    const request = error.config;
    if (!request._retry) {
        originalRequest._retry = true;
        return instance(request);
    }
    return Promise.reject(error)
})

export default instance