import { instance } from '../../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export interface DeleteDishByIdParams {
    id: string;
}

export type DeleteDishByIdConfig = RequestConfig<DeleteDishByIdParams>;

export const deleteDishById = async ({ config, params }: DeleteDishByIdConfig) =>
    instance.delete(`${MENU_API_URL}/foods/${params.id}`, config);