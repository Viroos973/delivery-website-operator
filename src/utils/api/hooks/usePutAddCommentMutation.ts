import { useMutation } from '@tanstack/react-query';
import { putAddComment, type PutAddCommentConfig } from '../requests/order/{id}/addComment';

export const usePutAddCommentMutation = (
    settings?: MutationSettings<PutAddCommentConfig, typeof putAddComment>
) =>
    useMutation({
        mutationKey: ['putAddComment'],
        mutationFn: ({ params, config }) =>
            putAddComment({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });