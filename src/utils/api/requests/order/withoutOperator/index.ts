import { instance } from '@/utils/api/instance';

export interface GetOrdersWithoutOperatorParams {
    page: number,
    size: number,
    sort: string[]
}

export type GetOrdersWithoutOperatorConfig = RequestConfig<GetOrdersWithoutOperatorParams>;

export const getOrdersWithoutOperator = async ({ config, params }: GetOrdersWithoutOperatorConfig) =>
    instance.get<Order[]>(`http://localhost:8096/order/find-without-operator?page=${params.page}&size=${params.size}&sort=${params.sort}`, config);