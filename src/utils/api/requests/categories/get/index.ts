import { instance } from '@/utils/api/instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type GetCategoriesConfig = RequestConfig;

export const getCategories = async ({ config }: GetCategoriesConfig) =>
    instance.get<Categories[]>(`${MENU_API_URL}/categories`, config);