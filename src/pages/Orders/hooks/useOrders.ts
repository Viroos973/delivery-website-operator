import { useGetMyOrdersQuery } from "@/utils/api/hooks/useGetMyOrdersQuery";
import { useGetOrdersWithFiltersQuery } from "@/utils/api/hooks/useGetOrdersWithFiltersQuery";
import { useGetOrdersWithoutOperatorQuery } from "@/utils/api/hooks/useGetOrdersWithoutOperatorQuery";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";

export interface OrderListFilters {
    statuses?: string,
    operators?: string
}

const SEARCH_TIMEOUT = 500;
const ITEMS_PER_PAGE = 1000;
export const useOrders = () => {
    const { authenticated, roles, userId } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMyOrder, setIsMyOrder] = useState<boolean>(true);
    const [isOrderWithoutOperator, setIsOrderWithoutOperator] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isGoToStart, setGoToStart] = useState(false);

    const isAdmin = authenticated && roles.includes('ADMIN');
    const statuses = [
        {
            id: "NEW",
            label: "Новый",
        },
        {
            id: "CONFIRMED",
            label: "Подтвержден",
        },
        {
            id: "COOKING",
            label: "Готовится",
        },
        {
            id: "WAITING_FOR_COURIER",
            label: "Ожидает курьера",
        },
        {
            id: "TOOK_BY_COURIER",
            label: "Передан курьеру",
        },
        {
            id: "COMPLETED",
            label: "Доставлен",
        },
        {
            id: "CANCELED",
            label: "Отменен",
        }
    ] as const

    const ordersWithoutOperator = useGetOrdersWithoutOperatorQuery({
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
        sort: []
    }, {
        options: {
            enabled: !isAdmin && isOrderWithoutOperator
        }
    })

    const myOrders = useGetMyOrdersQuery({
        operatorId: userId,
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
        sort: []
    }, {
        options: {
            enabled: !isAdmin && isMyOrder
        }
    })

    const initialFilters = useMemo((): OrderListFilters => {
        const params: OrderListFilters = {};

        const statuses = searchParams.get('statuses');
        if (statuses) params.statuses = statuses;

        const operators = searchParams.get('operators');
        if (operators) params.operators = operators;

        const myOrder = searchParams.get('isMyOrder');
        setIsMyOrder(!myOrder || myOrder === 'true')

        const withoutOperator = searchParams.get('withoutOperator');
        setIsOrderWithoutOperator(!withoutOperator || withoutOperator === 'true')

        return params;
    }, [searchParams]);

    const [filters, setFilters] = useState<OrderListFilters>(initialFilters);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (filters.statuses) {
            params.set('statuses', filters.statuses);
        } else {
            params.delete('statuses');
        }

        if (filters.operators) {
            params.set('operators', filters.operators);
        } else {
            params.delete('operators');
        }

        if (authenticated && roles.includes('ADMIN')) {
            params.delete('isMyOrder');
        } else if (isMyOrder) {
            params.set('isMyOrder', 'true');
        } else {
            params.set('isMyOrder', 'false');
        }

        if (authenticated && roles.includes('ADMIN')) {
            params.delete('withoutOperator');
        } else if (isOrderWithoutOperator) {
            params.set('withoutOperator', 'true');
        } else {
            params.set('withoutOperator', 'false');
        }

        setSearchParams(params, { replace: true });
    }, [authenticated, filters, isMyOrder, isOrderWithoutOperator, roles])

    const ordersWithFilters = useGetOrdersWithFiltersQuery({
        operatorName: filters.operators,
        status: filters.statuses === "all" ? undefined : filters.statuses,
        page: currentPage - 1,
        size: ITEMS_PER_PAGE,
        sort: []
    }, {
        options: {
            enabled: isAdmin
        }
    });

    const activeQuery = useMemo(() => {
        if (isAdmin) {
            return ordersWithFilters;
        } else if (!isAdmin && isMyOrder) {
            return myOrders;
        } else if (!isAdmin && isOrderWithoutOperator) {
            return ordersWithoutOperator;
        }

        return {
            data: undefined,
            isLoading: false,
            isError: false,
            error: null,
            refetch: () => {}
        };
    }, [isAdmin, isMyOrder, ordersWithFilters.data, myOrders.data, ordersWithoutOperator.data]);

    const handleSelectStatus = (id: string) => {
        setFilters({...filters, statuses: id})
        setGoToStart(prev => !prev)
    }

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setFilters({ ...filters, operators: name !== '' ? name : undefined });
        setGoToStart(prev => !prev)
    }, SEARCH_TIMEOUT);

    const handleSetIsMyOrder = (checked: boolean) => {
        setIsMyOrder(checked)
        setGoToStart(prev => !prev)
    }

    const handleSetWithoutOperator = (checked: boolean) => {
        setIsOrderWithoutOperator(checked)
        setGoToStart(prev => !prev)
    }

    return {
        state: { statuses, filters, isMyOrder, isOrderWithoutOperator, authenticated, roles, activeQuery, isGoToStart},
        functions: {
            debouncedSearchByName,
            handleSelectStatus,
            handleSetIsMyOrder,
            handleSetWithoutOperator,
            setFilters,
            setCurrentPage
        }
    }
};