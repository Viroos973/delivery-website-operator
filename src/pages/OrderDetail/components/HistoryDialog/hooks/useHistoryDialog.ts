import { useGetStatusHistoryQuery } from "@/utils/api/hooks/useGetStatusHistoryQuery";

export const useHistoryDialog = (order: Order) => {
    const statusHistory = useGetStatusHistoryQuery({ orderId: order.reservation.id })

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };

        return date.toLocaleString(undefined, options);
    }

    return {
        state: { statusHistory },
        functions: { formatDateTime }
    }
}