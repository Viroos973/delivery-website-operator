import { instance } from '@/utils/api/instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetOrdersWithoutOperatorParams {
    page: number,
    size: number,
    sort: string[]
}

export type GetOrdersWithoutOperatorConfig = RequestConfig<GetOrdersWithoutOperatorParams>;

export const getOrdersWithoutOperator = async ({ config, params }: GetOrdersWithoutOperatorConfig) =>
    instance.get<Order[]>(`${ORDER_API_URL}/find-without-operator?page=${params.page}&size=${params.size}&sort=${params.sort}`, config);