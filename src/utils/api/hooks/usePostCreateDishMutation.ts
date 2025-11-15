import { useMutation } from '@tanstack/react-query';
import { postCreateDish, type PostCreateDishConfig } from '../requests/foods/create';

export const usePostCreateDishMutation = (
    settings?: MutationSettings<PostCreateDishConfig, typeof postCreateDish>
) =>
    useMutation({
        mutationKey: ['postCreateDish'],
        mutationFn: ({ params, config }) =>
            postCreateDish({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });