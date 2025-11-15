import { useQuery } from '@tanstack/react-query';
import { getMyOrders, type GetMyOrdersParams } from '../requests/order/{id}/myOrders';

export const useGetMyOrdersQuery = (
    params: GetMyOrdersParams,
    settings?: QuerySettings<typeof getMyOrders>
) =>
    useQuery({
        queryKey: ['getMyOrders', { ...params }],
        queryFn: () => getMyOrders({ config: settings?.config, params }),
        ...settings?.options
    });