import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type GetAboutConfig = RequestConfig;

export const getAbout = async ({ config }: GetAboutConfig) =>
    instance.get<DetailAbout>(`${USER_API_URL}/about`, config);