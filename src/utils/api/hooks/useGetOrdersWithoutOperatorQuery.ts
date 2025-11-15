import { useQuery } from '@tanstack/react-query';
import { getOrdersWithoutOperator, type GetOrdersWithoutOperatorParams } from '../requests/order/withoutOperator';

export const useGetOrdersWithoutOperatorQuery = (
    params: GetOrdersWithoutOperatorParams,
    settings?: QuerySettings<typeof getOrdersWithoutOperator>
) =>
    useQuery({
        queryKey: ['getOrdersWithoutOperator', { ...params }],
        queryFn: () => getOrdersWithoutOperator({ config: settings?.config, params }),
        ...settings?.options
    });