import { useMutation } from '@tanstack/react-query';
import { putChangeOrderStatus, type PutChangeOrderStatusConfig } from '../requests/order/{id}/changeStatus';

export const usePutChangeOrderStatusMutation = (
    settings?: MutationSettings<PutChangeOrderStatusConfig, typeof putChangeOrderStatus>
) =>
    useMutation({
        mutationKey: ['putChangeOrderStatus'],
        mutationFn: ({ params, config }) =>
            putChangeOrderStatus({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });