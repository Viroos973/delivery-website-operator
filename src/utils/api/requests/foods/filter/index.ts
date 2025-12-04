import { instance } from '@/utils/api/instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetFoodsWithFilterParams {
    includeIngredients?: string[],
    excludeIngredients?: string[],
    minPrice?: number,
    maxPrice?: number,
    search?: string,
    sortBy?: string,
    sortDirection?: string,
    categoryId?: string
}

export type GetFoodsWithFilterConfig = RequestConfig<GetFoodsWithFilterParams>;

export const getFoodsWithFilter = ({ params, config }: GetFoodsWithFilterConfig) =>
    instance.post<Dish[]>(`${MENU_API_URL}/foods/filter`, params, config);