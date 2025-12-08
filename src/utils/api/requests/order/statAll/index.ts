import { instance } from '@/utils/api/instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export type GetStateOrderConfig = RequestConfig;

export const getStateOrder = async ({ config }: GetStateOrderConfig) =>
    instance.get<Stat[]>(`${ORDER_API_URL}/stat/all`, config);