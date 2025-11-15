import { instance } from '../../../../instance';

export interface DeleteDishByIdParams {
    id: string;
}

export type DeleteDishByIdConfig = RequestConfig<DeleteDishByIdParams>;

export const deleteDishById = async ({ config, params }: DeleteDishByIdConfig) =>
    instance.delete(`http://localhost:8080/api/foods/${params.id}`, config);