import axios from 'axios'
import qs from 'qs'

const Axios = axios.create({
    baseURL: "/",
    timeout: 10000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

Axios.interceptors.request.use(
    config => {
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        return Promise.reject(error);
    }
);

export default Axios