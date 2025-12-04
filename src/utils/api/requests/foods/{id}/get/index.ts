import { instance } from '../../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetDishByIdParams {
    id: string;
}

export type GetDishByIdConfig = RequestConfig<GetDishByIdParams>;

export const getDishById = async ({ config, params }: GetDishByIdConfig) =>
    instance.get<GetDetailDish>(`${MENU_API_URL}/foods/${params.id}`, config);