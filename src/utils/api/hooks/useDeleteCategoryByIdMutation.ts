import { useMutation } from '@tanstack/react-query';

import {deleteCategoryById, type DeleteCategoryByIdConfig} from "@/utils/api/requests/categories/{id}/delete";

export const useDeleteCategoryByIdMutation = (
    settings?: MutationSettings<DeleteCategoryByIdConfig, typeof deleteCategoryById>
) =>
    useMutation({
        mutationKey: ['deleteCategoryById'],
        mutationFn: ({ params, config }) =>
            deleteCategoryById({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });