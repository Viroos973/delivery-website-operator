import { instance } from '@/utils/api/instance';

export type GetCategoriesConfig = RequestConfig;

export const getCategories = async ({ config }: GetCategoriesConfig) =>
    instance.get<Categories[]>(`http://localhost:8080/api/categories`, config);