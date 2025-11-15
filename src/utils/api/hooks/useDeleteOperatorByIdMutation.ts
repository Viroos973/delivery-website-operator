import { useMutation } from '@tanstack/react-query';
import { deleteOperatorById, type DeleteOperatorByIdConfig } from '../requests/operators/{id}/delete';

export const useDeleteOperatorByIdMutation = (
    settings?: MutationSettings<DeleteOperatorByIdConfig, typeof deleteOperatorById>
) =>
    useMutation({
        mutationKey: ['deleteOperatorById'],
        mutationFn: ({ params, config }) =>
            deleteOperatorById({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });