import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useHistoryDialog } from "./hooks/useHistoryDialog";
import HistoryItem from "./components/HistoryItem";
import { Button } from "@/components/ui/button";

interface HistoryDialogProps {
    isHistory: boolean;
    setIsHistory: (isHistory: boolean) => void;
    order: Order;
}

const HistoryDialog = ({ isHistory, setIsHistory, order }: HistoryDialogProps) => {
    const { state, functions } = useHistoryDialog(order);

    return (
        <Dialog open={isHistory} onOpenChange={setIsHistory}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>История статусов</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col w-full gap-4">
                    {state.statusHistory.data?.data.map(status => (
                        <HistoryItem key={status.id} status={status} order={order} formatDateTime={functions.formatDateTime} />
                    ))}
                </div>
                <Button className="cursor-pointer" onClick={() => setIsHistory(false)}>Понятно</Button>
            </DialogContent>
        </Dialog>
    )
}

export default HistoryDialog;