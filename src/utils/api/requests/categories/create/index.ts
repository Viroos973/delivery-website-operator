import { instance } from '@/utils/api/instance';

export type PostCreateCategoryParams = {
    name: string,
    description: string
};

export type PostCreateCategoryConfig = RequestConfig<PostCreateCategoryParams>;

export const postCreateCategory = async ({ config, params }: PostCreateCategoryConfig) =>
    instance.post<Categories>(`http://localhost:8080/api/categories`, params, config);