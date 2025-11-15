import { useMutation } from '@tanstack/react-query';
import { putEditAbout, type PutEditAboutConfig } from '../requests/about/edit';

export const usePutEditAboutMutation = (
    settings?: MutationSettings<PutEditAboutConfig, typeof putEditAbout>
) =>
    useMutation({
        mutationKey: ['putEditAbout'],
        mutationFn: ({ params, config }) =>
            putEditAbout({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });