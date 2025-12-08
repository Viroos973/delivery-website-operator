import { instance } from '../../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export interface DeleteCategoryByIdParams {
    id: string;
}

export type DeleteCategoryByIdConfig = RequestConfig<DeleteCategoryByIdParams>;

export const deleteCategoryById = async ({ config, params }: DeleteCategoryByIdConfig) =>
    instance.delete(`${MENU_API_URL}/categories/${params.id}`, config);