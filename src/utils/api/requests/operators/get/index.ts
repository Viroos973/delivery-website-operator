import { instance } from '@/utils/api/instance';

export type GetOperatorsConfig = RequestConfig;

export const getOperators = async ({ config }: GetOperatorsConfig) =>
    instance.get<Operator[]>(`http://localhost:8910/api/users/operators`, config);