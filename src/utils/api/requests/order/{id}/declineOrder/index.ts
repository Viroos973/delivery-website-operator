import { instance } from '../../../../instance';

export type PutDeclineOrderParams = {
    orderId: string,
    declineReason: string
};

export type PutDeclineOrderConfig = RequestConfig<PutDeclineOrderParams>;

export const putDeclineOrder = async ({ config, params }: PutDeclineOrderConfig) =>
    instance.put(`http://localhost:8096/order/decline`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });