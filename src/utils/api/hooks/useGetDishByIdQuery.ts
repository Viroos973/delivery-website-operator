import { useQuery } from '@tanstack/react-query';

import {getDishById, type GetDishByIdParams} from "@/utils/api/requests/foods/{id}/get";

export const useGetDishByIdQuery = (
    params: GetDishByIdParams,
    settings?: QuerySettings<typeof getDishById>
) =>
    useQuery({
        queryKey: ['getCompanyById', params.id],
        queryFn: () => getDishById({ config: settings?.config, params }),
        ...settings?.options
    });