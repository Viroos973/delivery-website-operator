import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutChangeOperatorParams = {
    orderId: string,
    operatorId: string
};

export type PutChangeOperatorConfig = RequestConfig<PutChangeOperatorParams>;

export const putChangeOperator = async ({ config, params }: PutChangeOperatorConfig) =>
    instance.put(`${ORDER_API_URL}/change-operator-for-order`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });