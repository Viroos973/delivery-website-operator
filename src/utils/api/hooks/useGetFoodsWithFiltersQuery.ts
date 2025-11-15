import { useQuery } from '@tanstack/react-query';

import type { GetFoodsWithFilterParams } from '../requests/foods/filter';
import { getFoodsWithFilter } from '../requests/foods/filter';

export const useGetFoodsWithFiltersQuery = (
    params: GetFoodsWithFilterParams,
    settings?: QuerySettings<typeof getFoodsWithFilter>
) =>
    useQuery({
        queryKey: ['getFoodsWithFilter', {...params}],
        queryFn: () => getFoodsWithFilter({ config: settings?.config, params }),
        ...settings?.options
    });