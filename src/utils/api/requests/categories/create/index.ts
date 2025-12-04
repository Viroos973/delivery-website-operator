import { instance } from '@/utils/api/instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostCreateCategoryParams = {
    name: string,
    description: string
};

export type PostCreateCategoryConfig = RequestConfig<PostCreateCategoryParams>;

export const postCreateCategory = async ({ config, params }: PostCreateCategoryConfig) =>
    instance.post<Categories>(`${MENU_API_URL}/categories`, params, config);