import type { InternalAxiosRequestConfig } from 'axios';
import {getUserToken} from "../../helpers/getUserToken";

export const tokenInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    const token = getUserToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const basketId = localStorage.getItem('basketId');
    if (basketId) {
        config.headers.basketId = basketId;
    }

    return config;
};