import { instance } from '@/utils/api/instance';

export type GetStateOrderConfig = RequestConfig;

export const getStateOrder = async ({ config }: GetStateOrderConfig) =>
    instance.get<Stat[]>(`http://localhost:8096/order/stat/all`, config);