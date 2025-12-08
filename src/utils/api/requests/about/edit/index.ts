import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutEditAboutParams = {
    companyName: string,
    mailAddress: string,
    contactEmail: string,
    managerPhone: string,
    operatorPhone: string
};

export type PutEditAboutConfig = RequestConfig<PutEditAboutParams>;

export const putEditAbout = async ({ config, params }: PutEditAboutConfig) =>
    instance.put<DetailAbout>(`${USER_API_URL}/about`, params, config);