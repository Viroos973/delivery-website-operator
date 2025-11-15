import { useMutation } from '@tanstack/react-query';
import { postCreateOperator, type PostCreateOperatorConfig } from '../requests/operators/create';

export const usePostCreateOperatorMutation = (
    settings?: MutationSettings<PostCreateOperatorConfig, typeof postCreateOperator>
) =>
    useMutation({
        mutationKey: ['postCreateOperator'],
        mutationFn: ({ params, config }) =>
            postCreateOperator({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });