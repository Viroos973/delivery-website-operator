import { instance } from "@/utils/api/instance";

export interface DeleteDishByIdFromOrderParams {
    orderId?: string;
    dishId: string;
}

export type DeleteDishByIdFromOrderConfig = RequestConfig<DeleteDishByIdFromOrderParams>;

export const deleteDishByIdFromOrder = async ({ config, params }: DeleteDishByIdFromOrderConfig) =>
    instance.delete(`http://localhost:8096/order/delete-dish/${params.orderId}/${params.dishId}`, config);