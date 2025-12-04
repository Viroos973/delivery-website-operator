import { instance } from '@/utils/api/instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetMyOrdersParams {
    operatorId: string,
    page: number,
    size: number,
    sort: string[]
}

export type GetMyOrdersConfig = RequestConfig<GetMyOrdersParams>;

export const getMyOrders = async ({ config, params }: GetMyOrdersConfig) =>
    instance.get<Order[]>(`${ORDER_API_URL}/find-by-operator/${params.operatorId}`, {
        ...config,
        params: { ...config?.params, ...params }
    });