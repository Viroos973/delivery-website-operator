import { instance } from "@/utils/api/instance";
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutEditAmountDishToOrderParams = {
    amount: number,
    orderId: string,
    dishId: string
};

export type PutEditAmountDishToOrderConfig = RequestConfig<PutEditAmountDishToOrderParams>;

export const putEditAmountDishToOrder = async ({ config, params }: PutEditAmountDishToOrderConfig) =>
    instance.put(`${ORDER_API_URL}/change/quantity/${params.orderId}/${params.dishId}`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });