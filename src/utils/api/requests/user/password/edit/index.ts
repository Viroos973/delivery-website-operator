import { instance } from '@/utils/api/instance';

export type PutEditPasswordParams = {
    password: string,
    newPassword: string
};

export type PutEditPasswordConfig = RequestConfig<PutEditPasswordParams>;

export const putEditPassword = async ({ config, params }: PutEditPasswordConfig) =>
    instance.put(`http://localhost:8910/api/users/password/change`, params, config);