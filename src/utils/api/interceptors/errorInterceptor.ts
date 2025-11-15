import type {AxiosError, InternalAxiosRequestConfig} from 'axios';

import {ValidationError} from "ajv";
import {REFRESH_TOKEN, USER_TOKEN} from "../../constants/token";
import {getRefreshToken} from "@/utils/helpers/getUserToken.ts";
import {instance} from "@/utils/api/instance.ts";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const errorInterceptor = async (error: AxiosError<ValidationError>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refresh = getRefreshToken();
            const response = await instance.post('http://localhost:8910/api/auth/refresh',
                { refreshToken: refresh });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem(USER_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

            return instance(originalRequest);
        } catch (e) {
            localStorage.removeItem(USER_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
    }
    return Promise.reject(error);
};