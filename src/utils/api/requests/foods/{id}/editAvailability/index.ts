import { instance } from '../../../../instance';

export type PatchUpdateAvailabilityDishParams = {
    id: string;
    available: boolean
};

export type PatchUpdateAvailabilityDishConfig = RequestConfig<PatchUpdateAvailabilityDishParams>;

export const patchUpdateAvailabilityDish = async ({ config, params }: PatchUpdateAvailabilityDishConfig) =>
    instance.patch<DetailDish>(`http://localhost:8080/api/foods/${params.id}/availability?available=${params.available}`, config);