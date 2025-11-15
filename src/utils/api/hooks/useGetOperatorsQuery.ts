import { useQuery } from '@tanstack/react-query';
import { getOperators } from '../requests/operators/get';

export const useGetOperatorsQuery = (settings?: QuerySettings<typeof getOperators>) =>
    useQuery({
        queryKey: ['getOperators'],
        queryFn: () => getOperators({ config: settings?.config }),
        ...settings?.options
    });