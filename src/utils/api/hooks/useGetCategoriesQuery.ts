import { useQuery } from '@tanstack/react-query';

import {getCategories} from "@/utils/api/requests/categories/get";

export const useGetCategoriesQuery = (settings?: QuerySettings<typeof getCategories>) =>
    useQuery({
        queryKey: ['getCategories'],
        queryFn: () => getCategories({ config: settings?.config }),
        ...settings?.options
    });