import { instance } from '@/utils/api/instance';

export type PostLoginOperatorParams = {
    username: string,
    password: string
};

export type PostLoginOperatorConfig = RequestConfig<PostLoginOperatorParams>;

export const postLoginOperator = async ({ config, params }: PostLoginOperatorConfig) =>
    instance.post<Token>(`http://localhost:8910/api/auth/staff/sign-in`, params, config);