import { useMutation } from '@tanstack/react-query';
import {
    putEditAmountDishToOrder,
    type PutEditAmountDishToOrderConfig
} from "@/utils/api/requests/order/{id}/update/editAmountDish";

export const usePutEditAmountDishToOrderMutation = (
    settings?: MutationSettings<PutEditAmountDishToOrderConfig, typeof putEditAmountDishToOrder>
) =>
    useMutation({
        mutationKey: ['putEditAmountDishToOrder'],
        mutationFn: ({ params, config }) =>
            putEditAmountDishToOrder({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });