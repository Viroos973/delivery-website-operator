import { instance } from '@/utils/api/instance';

export type GetAboutConfig = RequestConfig;

export const getAbout = async ({ config }: GetAboutConfig) =>
    instance.get<DetailAbout>(`http://localhost:8910/api/about`, config);