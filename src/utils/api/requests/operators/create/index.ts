import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostCreateOperatorParams = {
    fullName: string,
    password: string,
    phone: string,
    username: string
};

export type PostCreateOperatorConfig = RequestConfig<PostCreateOperatorParams>;

export const postCreateOperator = async ({ config, params }: PostCreateOperatorConfig) =>
    instance.post<Operator>(`${USER_API_URL}/users/registration/operator`, params, config);