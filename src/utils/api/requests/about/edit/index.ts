import { instance } from '@/utils/api/instance';

export type PutEditAboutParams = {
    companyName: string,
    mailAddress: string,
    contactEmail: string,
    managerPhone: string,
    operatorPhone: string
};

export type PutEditAboutConfig = RequestConfig<PutEditAboutParams>;

export const putEditAbout = async ({ config, params }: PutEditAboutConfig) =>
    instance.put<DetailAbout>(`http://localhost:8910/api/about`, params, config);