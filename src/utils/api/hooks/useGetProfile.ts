import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../requests/user/profile';

export const useGetProfile = (settings?: QuerySettings<typeof getProfile>) =>
    useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile({ config: settings?.config }),
        ...settings?.options
    });