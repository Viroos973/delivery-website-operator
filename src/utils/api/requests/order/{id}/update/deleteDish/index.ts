import { instance } from "@/utils/api/instance";
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface DeleteDishByIdFromOrderParams {
    orderId?: string;
    dishId: string;
}

export type DeleteDishByIdFromOrderConfig = RequestConfig<DeleteDishByIdFromOrderParams>;

export const deleteDishByIdFromOrder = async ({ config, params }: DeleteDishByIdFromOrderConfig) =>
    instance.delete(`${ORDER_API_URL}/delete-dish/${params.orderId}/${params.dishId}`, config);