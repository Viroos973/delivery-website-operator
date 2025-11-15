import { useQuery } from '@tanstack/react-query';
import { getOrderById, type GetOrderByIdParams } from '../requests/order/{id}/get';

export const useGetOrderByIdQuery = (
    params: GetOrderByIdParams,
    settings?: QuerySettings<typeof getOrderById>
) =>
    useQuery({
        queryKey: ['getOrderById', params.orderId],
        queryFn: () => getOrderById({ config: settings?.config, params }),
        ...settings?.options
    });