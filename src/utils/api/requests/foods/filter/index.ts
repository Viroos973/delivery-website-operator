import { instance } from '@/utils/api/instance';

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
    instance.post<Dish[]>('http://localhost:8080/api/foods/filter', params, config);