import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/'
})

instance.interceptors.response.use(response => {
    return response
}, async (error) => {
    const request = error.config;
    if (!request._retry) {
        request._retry = true;
        return instance(request);
    }
    if (error.response && error.response.status === 400) {
        // Show alert for 400 (Bad Request) errors
        alert(error.response.data.message);
    } else {
        // Handle other errors (optional)
        alert('API request failed! An unexpected error occurred.');
    }

    return Promise.reject(error)
})

export default instance