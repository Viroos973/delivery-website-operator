import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type GetProfileConfig = RequestConfig;

export const getProfile = async ({ config }: GetProfileConfig) =>
    instance.get<UserProfileDTO>(`${USER_API_URL}/users/me`, config);