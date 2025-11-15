import { instance } from '@/utils/api/instance';

export interface GetMyOrdersParams {
    operatorId: string,
    page: number,
    size: number,
    sort: string[]
}

export type GetMyOrdersConfig = RequestConfig<GetMyOrdersParams>;

export const getMyOrders = async ({ config, params }: GetMyOrdersConfig) =>
    instance.get<Order[]>(`http://localhost:8096/order/find-by-operator/${params.operatorId}`, {
        ...config,
        params: { ...config?.params, ...params }
    });