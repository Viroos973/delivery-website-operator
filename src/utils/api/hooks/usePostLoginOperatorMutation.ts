import { useMutation } from '@tanstack/react-query';

import {postLoginOperator, type PostLoginOperatorConfig} from "@/utils/api/requests/user/loginOperator";

export const usePostLoginOperatorMutation = (
    settings?: MutationSettings<PostLoginOperatorConfig, typeof postLoginOperator>
) =>
    useMutation({
        mutationKey: ['postLoginOperator'],
        mutationFn: ({ params, config }) =>
            postLoginOperator({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });