import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutEditPasswordParams = {
    password: string,
    newPassword: string
};

export type PutEditPasswordConfig = RequestConfig<PutEditPasswordParams>;

export const putEditPassword = async ({ config, params }: PutEditPasswordConfig) =>
    instance.put(`${USER_API_URL}/users/password/change`, params, config);