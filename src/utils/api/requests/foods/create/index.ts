import { instance } from '@/utils/api/instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostCreateDishParams = {
    name: string,
    categoryId: string,
    photos?: File[],
    price: number,
    description: string,
    ingredients: string[]
};

export type PostCreateDishConfig = RequestConfig<PostCreateDishParams>;

export const postCreateDish = async ({ config, params }: PostCreateDishConfig) => {
    const formData = new FormData();

    formData.append('name', params.name);
    formData.append('categoryId', params.categoryId);
    formData.append('price', params.price.toString());
    formData.append('description', params.description);

    params.ingredients.forEach(ingredient => {
        formData.append('ingredients', ingredient);
    });

    if (params.photos) {
        params.photos.forEach(file => {
            formData.append('photos', file);
        });
    }

    return instance.post<DetailDish>(`${MENU_API_URL}/foods`, formData, {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
};