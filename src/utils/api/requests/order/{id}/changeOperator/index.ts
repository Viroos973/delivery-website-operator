import { instance } from '../../../../instance';

export type PutChangeOperatorParams = {
    orderId: string,
    operatorId: string
};

export type PutChangeOperatorConfig = RequestConfig<PutChangeOperatorParams>;

export const putChangeOperator = async ({ config, params }: PutChangeOperatorConfig) =>
    instance.put(`http://localhost:8096/order/change-operator-for-order`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });