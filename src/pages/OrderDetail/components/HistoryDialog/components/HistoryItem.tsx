import { TranslateStatus } from "@/utils/constants/translateStatus";

interface HistoryItemProps {
    status: StatusHistory;
    order: Order;
    formatDateTime: (dateTime: string) => string;
    changeStatus: (status: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ status, order, formatDateTime, changeStatus }) => {

    return (
        <div className="flex flex-col gap-1" onClick={() => changeStatus(status.status)}>
            <span className={`font-medium ${status.status == order.reservation.status ? 'text-green-600' : 'text-black'}`}>{TranslateStatus[status.status]}</span>
            <span className={`${status.status == order.reservation.status ? 'text-green-600' : 'text-black'}`}>{formatDateTime(status.date)}</span>
        </div>
    )
}

export default HistoryItem;