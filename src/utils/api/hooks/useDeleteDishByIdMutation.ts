import { useMutation } from '@tanstack/react-query';
import { deleteDishById, type DeleteDishByIdConfig } from '../requests/foods/{id}/delete';

export const useDeleteDishByIdMutation = (
    settings?: MutationSettings<DeleteDishByIdConfig, typeof deleteDishById>
) =>
    useMutation({
        mutationKey: ['deleteDishById'],
        mutationFn: ({ params, config }) =>
            deleteDishById({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });