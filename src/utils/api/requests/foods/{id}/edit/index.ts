import { instance } from '../../../../instance';

export type PutUpdateDishParams = {
    id: string;
    name: string,
    categoryId: string,
    photos?: string[],
    rate: number,
    price: number,
    description: string,
    ingredients: string[],
    isAvailable: boolean
};

export type PutUpdateDishConfig = RequestConfig<PutUpdateDishParams>;

export const putUpdateDish = async ({ config, params }: PutUpdateDishConfig) =>
    instance.put<DetailDish>(`http://localhost:8080/api/foods/${params.id}`, params, config);