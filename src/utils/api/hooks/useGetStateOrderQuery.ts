import { useQuery } from '@tanstack/react-query';

import {getStateOrder} from "@/utils/api/requests/order/statAll";

export const useGetStateOrderQuery = (settings?: QuerySettings<typeof getStateOrder>) =>
    useQuery({
        queryKey: ['getStateOrder'],
        queryFn: () => getStateOrder({ config: settings?.config }),
        ...settings?.options
    });