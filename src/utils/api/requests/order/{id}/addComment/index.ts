import { instance } from '../../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutAddCommentParams = {
    orderId: string,
    comment: string
};

export type PutAddCommentConfig = RequestConfig<PutAddCommentParams>;

export const putAddComment = async ({ config, params }: PutAddCommentConfig) =>
    instance.put(`${ORDER_API_URL}/comment/${params.orderId}`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });