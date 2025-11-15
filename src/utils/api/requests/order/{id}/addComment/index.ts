import { instance } from '../../../../instance';

export type PutAddCommentParams = {
    orderId: string,
    comment: string
};

export type PutAddCommentConfig = RequestConfig<PutAddCommentParams>;

export const putAddComment = async ({ config, params }: PutAddCommentConfig) =>
    instance.put(`http://localhost:8096/order/comment/${params.orderId}`, null, {
        ...config,
        params: { ...config?.params, ...params }
    });