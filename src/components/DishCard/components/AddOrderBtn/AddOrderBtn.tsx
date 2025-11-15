import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { useAddOrderBtn } from "./hooks/useAddOrderBtn";

interface AddOrderBtnProps extends ComponentProps<'button'> {
    initialNum?: number;
    idDish: string;
    orderId: string;
    isBtnDeleteLock?: boolean
    reload: () => void;
}

const AddOrderBtn = ({ initialNum = 0, isBtnDeleteLock = false, idDish, orderId, reload, className, ...props }: AddOrderBtnProps) => {
    const { state, functions } = useAddOrderBtn(initialNum, idDish, orderId, reload)

    return (
        <>
            {state.dishNumber > 0 ? (
                <div className={cn("flex items-center justify-between", className)}>
                    <Button className="h-10" onClick={functions.handleRemoveOrder} disabled={isBtnDeleteLock && (state.dishNumber < 2)}>
                        {"-"}
                    </Button>
                    <p className="text-xl">{state.dishNumber}</p>
                    <Button className="h-10" onClick={functions.handleAddDishToOrder}>
                        {"+"}
                    </Button>
                </div>
            ) : (
                <Button className={cn("h-10", className)} {...props} onClick={functions.handleAddOrder}>
                    {"Добавить в заказ"}
                </Button>
            )}
        </>
    )
}

export default AddOrderBtn;