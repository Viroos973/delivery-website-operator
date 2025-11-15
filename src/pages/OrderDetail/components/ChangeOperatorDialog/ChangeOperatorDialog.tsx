import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useChangeOperatorDialog } from "./hooks/useChangeOperatorDialog";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ChangeOperatorItem from "./components/ChangeOperatorItem";

interface ChangeOperatorDialogProps {
    isChangeOperator: boolean;
    setIsChangeOperator: (isChangeOperator: boolean) => void;
    orderId: string;
    reloadOrder: () => void;
}

const ChangeOperatorDialog = ({ isChangeOperator, setIsChangeOperator, orderId, reloadOrder }: ChangeOperatorDialogProps) => {
    const { state, functions } = useChangeOperatorDialog(setIsChangeOperator, orderId, reloadOrder);

    return (
        <Dialog open={isChangeOperator} onOpenChange={setIsChangeOperator}>
            <DialogContent className="mx-auto max-w-md overflow-hidden w-auto">
                <DialogHeader>
                    <DialogTitle>Операторы</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col ">
                    {state.operators.data?.data.map(operator => (
                        <ChangeOperatorItem operator={operator} changeOperators={functions.changeOperators} />
                    ))}
                </div>
                <CustomPagination totalPages={state.totalPage} />
            </DialogContent>
        </Dialog>
    )
}

export default ChangeOperatorDialog;