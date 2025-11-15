import { useMutation } from '@tanstack/react-query';

import {putUpdateCategory, type PutUpdateCategoryConfig} from "@/utils/api/requests/categories/{id}/update";

export const usePutUpdateCompanyMutation = (
    settings?: MutationSettings<PutUpdateCategoryConfig, typeof putUpdateCategory>
) =>
    useMutation({
        mutationKey: ['putUpdateCategory'],
        mutationFn: ({ params, config }) =>
            putUpdateCategory({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });