import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetOrderByIdParams {
    orderId: string;
}

export type GetOrderByIdConfig = RequestConfig<GetOrderByIdParams>;

export const getOrderById = async ({ config, params }: GetOrderByIdConfig) =>
    instance.get<Order>(`${ORDER_API_URL}/find-by/${params.orderId}`, config);
