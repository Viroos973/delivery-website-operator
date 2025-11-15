import { useQuery } from '@tanstack/react-query';
import { getOrdersWithFilters, type GetOrdersWithFiltersParams } from '../requests/order/filters';

export const useGetOrdersWithFiltersQuery = (
    params: GetOrdersWithFiltersParams,
    settings?: QuerySettings<typeof getOrdersWithFilters>
) =>
    useQuery({
        queryKey: ['getOrdersWithFilters', { ...params }],
        queryFn: () => getOrdersWithFilters({ config: settings?.config, params }),
        ...settings?.options
    });