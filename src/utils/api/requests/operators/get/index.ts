import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type GetOperatorsConfig = RequestConfig;

export const getOperators = async ({ config }: GetOperatorsConfig) =>
    instance.get<Operator[]>(`${USER_API_URL}/users/operators`, config);