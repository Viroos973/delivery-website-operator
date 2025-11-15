import { useMutation } from '@tanstack/react-query';
import { putEditPassword, type PutEditPasswordConfig } from '../requests/user/password/edit';

export const usePutEditPasswordMutation = (
    settings?: MutationSettings<PutEditPasswordConfig, typeof putEditPassword>
) =>
    useMutation({
        mutationKey: ['putEditPassword'],
        mutationFn: ({ params, config }) =>
            putEditPassword({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });