import { instance } from '../../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutUpdateCategoryParams = {
    id: string;
    name: string,
    description: string
};

export type PutUpdateCategoryConfig = RequestConfig<PutUpdateCategoryParams>;

export const putUpdateCategory = async ({ config, params }: PutUpdateCategoryConfig) =>
    instance.put<Categories>(`${MENU_API_URL}/categories/${params.id}`, params, config);