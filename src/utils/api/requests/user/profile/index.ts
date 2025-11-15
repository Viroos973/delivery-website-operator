import { instance } from '@/utils/api/instance';

export type GetProfileConfig = RequestConfig;

export const getProfile = async ({ config }: GetProfileConfig) =>
    instance.get<UserProfileDTO>(`http://localhost:8910/api/users/me`, config);