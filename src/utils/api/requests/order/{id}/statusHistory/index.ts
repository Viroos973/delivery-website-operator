import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetStatusHistoryParams {
    orderId: string;
}

export type GetStatusHistoryConfig = RequestConfig<GetStatusHistoryParams>;

export const getStatusHistory = async ({ config, params }: GetStatusHistoryConfig) =>
    instance.get<StatusHistory[]>(`${ORDER_API_URL}/get-status-history`, {
        ...config,
        params: { ...config?.params, ...params }
    });