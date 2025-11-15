import { useMutation } from '@tanstack/react-query';
import { deleteDishByIdFromOrder, type DeleteDishByIdFromOrderConfig } from '../requests/order/{id}/update/deleteDish';

export const useDeleteDishByIdFromOrderMutation = (
    settings?: MutationSettings<DeleteDishByIdFromOrderConfig, typeof deleteDishByIdFromOrder>
) =>
    useMutation({
        mutationKey: ['deleteDishByIdFromOrder'],
        mutationFn: ({ params, config }) =>
            deleteDishByIdFromOrder({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });