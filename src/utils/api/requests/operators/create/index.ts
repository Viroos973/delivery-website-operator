import { instance } from '@/utils/api/instance';

export type PostCreateOperatorParams = {
    fullName: string,
    password: string,
    phone: string,
    username: string
};

export type PostCreateOperatorConfig = RequestConfig<PostCreateOperatorParams>;

export const postCreateOperator = async ({ config, params }: PostCreateOperatorConfig) =>
    instance.post<Operator>(`http://localhost:8910/api/users/registration/operator`, params, config);