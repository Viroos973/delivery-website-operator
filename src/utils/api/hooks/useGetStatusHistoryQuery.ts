import { useQuery } from '@tanstack/react-query';
import { getStatusHistory, type GetStatusHistoryParams } from '../requests/order/{id}/statusHistory';

export const useGetStatusHistoryQuery = (
    params: GetStatusHistoryParams,
    settings?: QuerySettings<typeof getStatusHistory>
) =>
    useQuery({
        queryKey: ['getStatusHistory', params.orderId],
        queryFn: () => getStatusHistory({ config: settings?.config, params }),
        ...settings?.options
    });