import { instance } from '@/utils/api/instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetOrdersWithFiltersParams {
    operatorName?: string,
    status?: string,
    page: number,
    size: number,
    sort: string[]
}

export type GetOrdersWithFiltersConfig = RequestConfig<GetOrdersWithFiltersParams>;

export const getOrdersWithFilters = ({ params, config }: GetOrdersWithFiltersConfig) =>
    instance.get<Order[]>(`${ORDER_API_URL}/get-with-filters`, {
        ...config,
        params: { ...config?.params, ...params }
    });