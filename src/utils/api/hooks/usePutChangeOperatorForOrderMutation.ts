import { useMutation } from '@tanstack/react-query';
import { type PutChangeOperatorConfig, putChangeOperator } from '../requests/order/{id}/changeOperator';

export const usePutChangeOperatorMutation = (
    settings?: MutationSettings<PutChangeOperatorConfig, typeof putChangeOperator>
) =>
    useMutation({
        mutationKey: ['putChangeOperator'],
        mutationFn: ({ params, config }) =>
            putChangeOperator({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });