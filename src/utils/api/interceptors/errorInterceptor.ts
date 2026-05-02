import type {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {REFRESH_TOKEN, USER_TOKEN} from "../../constants/token";
import {getRefreshToken} from "@/utils/helpers/getUserToken.ts";
import {instance} from "@/utils/api/instance.ts";
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";
import {getErrorMessage} from "@/utils/helpers/getErrorMessage.ts";
import {toast} from "sonner";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const errorInterceptor = async (error: AxiosError) => {
    if (!error.config) {
        return Promise.reject(error);
    }

    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')
    ) {
        originalRequest._retry = true;

        try {
            const refresh = getRefreshToken();

            const response = await instance.post(`${USER_API_URL}/auth/refresh`, {
                refreshToken: refresh,
            });

            const { accessToken, refreshToken } = response.data;

            localStorage.setItem(USER_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);

            return instance(originalRequest);
        } catch (e) {
            localStorage.removeItem(USER_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);

            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }

            return Promise.reject(e);
        }
    }

    toast.error(getErrorMessage(error));
    return Promise.reject(error);
};