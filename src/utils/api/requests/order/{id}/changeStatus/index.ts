import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutChangeOrderStatusParams = {
    orderId: string,
    status: string
};

export type PutChangeOrderStatusConfig = RequestConfig<PutChangeOrderStatusParams>;

export const putChangeOrderStatus = async ({ config, params }: PutChangeOrderStatusConfig) =>
    instance.put(`${ORDER_API_URL}/change-order-status/${params.orderId}`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });