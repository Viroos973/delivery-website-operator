import { useMutation } from '@tanstack/react-query';
import { putUpdateDish, type PutUpdateDishConfig } from '../requests/foods/{id}/edit';


export const usePutUpdateDishMutation = (
    settings?: MutationSettings<PutUpdateDishConfig, typeof putUpdateDish>
) =>
    useMutation({
        mutationKey: ['putUpdateDish'],
        mutationFn: ({ params, config }) =>
            putUpdateDish({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });