import type {AxiosError} from "axios";

export const getErrorMessage = (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
        case 400:
            return "Неверный запрос";
        case 401:
            return "Необходима авторизация";
        case 403:
            return "Доступ запрещён";
        case 404:
            return "Не найдено";
        case 500:
            return "Ошибка сервера";
        default:
            return "Что-то пошло не так";
    }
};