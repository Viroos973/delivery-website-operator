import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutDeclineOrderParams = {
    orderId: string,
    declineReason: string
};

export type PutDeclineOrderConfig = RequestConfig<PutDeclineOrderParams>;

export const putDeclineOrder = async ({ config, params }: PutDeclineOrderConfig) =>
    instance.put(`${ORDER_API_URL}/decline`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });