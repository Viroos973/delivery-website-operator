import { useQuery } from '@tanstack/react-query';
import { getAbout } from '../requests/about/get';

export const useGetAbout = (settings?: QuerySettings<typeof getAbout>) =>
    useQuery({
        queryKey: ['getAbout'],
        queryFn: () => getAbout({ config: settings?.config }),
        ...settings?.options
    });