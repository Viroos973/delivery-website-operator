import { instance } from '@/utils/api/instance';

export interface GetOrdersWithFiltersParams {
    operatorName?: string,
    status?: string,
    page: number,
    size: number,
    sort: string[]
}

export type GetOrdersWithFiltersConfig = RequestConfig<GetOrdersWithFiltersParams>;

export const getOrdersWithFilters = ({ params, config }: GetOrdersWithFiltersConfig) =>
    instance.get<Order[]>(`http://localhost:8096/order/get-with-filters`, {
        ...config,
        params: { ...config?.params, ...params }
    });