import { instance } from '../../../../instance';

export type PutUpdateCategoryParams = {
    id: string;
    name: string,
    description: string
};

export type PutUpdateCategoryConfig = RequestConfig<PutUpdateCategoryParams>;

export const putUpdateCategory = async ({ config, params }: PutUpdateCategoryConfig) =>
    instance.put<Categories>(`http://localhost:8080/api/categories/${params.id}`, params, config);