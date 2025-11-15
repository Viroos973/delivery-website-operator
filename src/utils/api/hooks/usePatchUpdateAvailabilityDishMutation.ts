import { useMutation } from '@tanstack/react-query';
import { patchUpdateAvailabilityDish, type PatchUpdateAvailabilityDishConfig } from '../requests/foods/{id}/editAvailability';

export const usePatchUpdateAvailabilityDishMutation = (
    settings?: MutationSettings<PatchUpdateAvailabilityDishConfig, typeof patchUpdateAvailabilityDish>
) =>
    useMutation({
        mutationKey: ['patchUpdateAvailabilityDish'],
        mutationFn: ({ params, config }) =>
            patchUpdateAvailabilityDish({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });