import { instance } from '../../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PatchUpdateAvailabilityDishParams = {
    id: string;
    available: boolean
};

export type PatchUpdateAvailabilityDishConfig = RequestConfig<PatchUpdateAvailabilityDishParams>;

export const patchUpdateAvailabilityDish = async ({ config, params }: PatchUpdateAvailabilityDishConfig) =>
    instance.patch<DetailDish>(`${MENU_API_URL}/foods/${params.id}/availability?available=${params.available}`, config);