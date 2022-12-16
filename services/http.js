import axios from 'axios';
import {getAuthenticatedUser} from "../helpers";

const authenticatedUser = typeof window !== 'undefined' ? getAuthenticatedUser() : null;

axios.interceptors.request.use(
    function (config) {
        if(authenticatedUser) {
            config.headers.Authorization = `Bearer ${authenticatedUser.token}`;
        }

        config.baseURL = process.env.NEXT_PUBLIC_API_URL;

        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};