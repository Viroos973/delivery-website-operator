import { useMutation } from '@tanstack/react-query';
import { putAddDishToOrder, type PutAddDishToOrderConfig } from '../requests/order/{id}/update/addDish';

export const usePutAddDishToOrderMutation = (
    settings?: MutationSettings<PutAddDishToOrderConfig, typeof putAddDishToOrder>
) =>
    useMutation({
        mutationKey: ['putAddDishToOrder'],
        mutationFn: ({ params, config }) =>
            putAddDishToOrder({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });