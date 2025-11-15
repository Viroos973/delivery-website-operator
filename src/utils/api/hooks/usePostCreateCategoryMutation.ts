import { useMutation } from '@tanstack/react-query';
import {postCreateCategory, type PostCreateCategoryConfig} from "@/utils/api/requests/categories/create";

export const usePostCreateCategoryMutation = (
    settings?: MutationSettings<PostCreateCategoryConfig, typeof postCreateCategory>
) =>
    useMutation({
        mutationKey: ['postCreateCategory'],
        mutationFn: ({ params, config }) =>
            postCreateCategory({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });