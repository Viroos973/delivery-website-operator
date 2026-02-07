import { useGetStatusHistoryQuery } from "@/utils/api/hooks/useGetStatusHistoryQuery";
import { usePutChangeOrderStatusMutation } from "@/utils/api/hooks/usePutChangeOrderStatusMutation";
import { CHANGE_ORDER_STATUS } from "@/utils/constants/envBugs";

export const useHistoryDialog = (order: Order) => {
    const statusHistory = useGetStatusHistoryQuery({ orderId: order.reservation.id })
    const changeOrderStatus = usePutChangeOrderStatusMutation()

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };

        return date.toLocaleString(undefined, options);
    }

    const changeStatus = (async (status: string) => {
        if (CHANGE_ORDER_STATUS) {
            await changeOrderStatus.mutateAsync({
                params: {
                    orderId: order.reservation.id, status
                }
            })
        }
    })

    return {
        state: { statusHistory },
        functions: { formatDateTime, changeStatus }
    }
}