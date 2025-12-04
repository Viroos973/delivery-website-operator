import { instance } from "@/utils/api/instance";
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutAddDishToOrderParams = {
    orderId: string,
    dishId: string
};

export type PutAddDishToOrderConfig = RequestConfig<PutAddDishToOrderParams>;

export const putAddDishToOrder = async ({ config, params }: PutAddDishToOrderConfig) =>
    instance.put(`${ORDER_API_URL}/add-dish/${params.orderId}/${params.dishId}`, null, config);