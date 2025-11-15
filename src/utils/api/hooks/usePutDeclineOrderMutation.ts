import { useMutation } from '@tanstack/react-query';
import { putDeclineOrder, type PutDeclineOrderConfig } from '../requests/order/{id}/declineOrder';

export const usePutDeclineOrderMutation = (
    settings?: MutationSettings<PutDeclineOrderConfig, typeof putDeclineOrder>
) =>
    useMutation({
        mutationKey: ['putDeclineOrder'],
        mutationFn: ({ params, config }) =>
            putDeclineOrder({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });