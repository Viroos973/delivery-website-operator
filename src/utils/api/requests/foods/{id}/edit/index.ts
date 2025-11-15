import { instance } from '../../../../instance';

export type PutUpdateDishParams = {
    id: string;
    name: string,
    categoryId: string,
    newPhotos?: File[],
    photosToDelete: string[],
    existingPhotos: string[],
    price: number,
    description: string,
    ingredients: string[]
};

export type PutUpdateDishConfig = RequestConfig<PutUpdateDishParams>;

export const putUpdateDish = async ({ config, params }: PutUpdateDishConfig) => {
    const formData = new FormData();

    formData.append('name', params.name);
    formData.append('categoryId', params.categoryId);
    formData.append('price', params.price.toString());
    formData.append('description', params.description);

    params.ingredients.forEach(ingredient => {
        formData.append('ingredients', ingredient);
    });
    params.photosToDelete.forEach(photo => {
        formData.append('photosToDelete', photo);
    });
    params.existingPhotos.forEach(photo => {
        formData.append('existingPhotos', photo);
    });

    if (params.newPhotos) {
        params.newPhotos.forEach(file => {
            formData.append('newPhotos', file);
        });
    }

    return instance.put<DetailDish>(`http://localhost:8080/api/foods/${params.id}`, formData, {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
}