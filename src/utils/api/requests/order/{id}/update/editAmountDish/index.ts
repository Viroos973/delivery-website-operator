import { instance } from "@/utils/api/instance";

export type PutEditAmountDishToOrderParams = {
    amount: number,
    orderId: string,
    dishId: string
};

export type PutEditAmountDishToOrderConfig = RequestConfig<PutEditAmountDishToOrderParams>;

export const putEditAmountDishToOrder = async ({ config, params }: PutEditAmountDishToOrderConfig) =>
    instance.put(`http://localhost:8096/order/change/quantity/${params.orderId}/${params.dishId}`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });