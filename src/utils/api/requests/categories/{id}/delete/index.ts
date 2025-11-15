import { instance } from '../../../../instance';

export interface DeleteCategoryByIdParams {
    id: string;
}

export type DeleteCategoryByIdConfig = RequestConfig<DeleteCategoryByIdParams>;

export const deleteCategoryById = async ({ config, params }: DeleteCategoryByIdConfig) =>
    instance.delete(`http://localhost:8080/api/categories/${params.id}`, config);