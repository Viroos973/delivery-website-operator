import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostLoginOperatorParams = {
    username: string,
    password: string
};

export type PostLoginOperatorConfig = RequestConfig<PostLoginOperatorParams>;

export const postLoginOperator = async ({ config, params }: PostLoginOperatorConfig) =>
    instance.post<Token>(`${USER_API_URL}/auth/staff/sign-in`, params, config);