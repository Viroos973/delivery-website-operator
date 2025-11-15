import { usePutAddDishToOrderMutation } from "@/utils/api/hooks/usePutAddDishToOrder";
import { useState } from "react";
import {usePutEditAmountDishToOrderMutation} from "@/utils/api/hooks/usePutEditAmountDishToOrderMutation.ts";

export const useAddOrderBtn = (initialNum: number, idDish: string, orderId: string, reload: () => void) => {
    const addDishIntoOrder = usePutAddDishToOrderMutation()
    const editAmountDishToOrder = usePutEditAmountDishToOrderMutation()

    const [dishNumber, setDishNumber] = useState(initialNum);

    const handleAddOrder = async () => {
        await addDishIntoOrder.mutateAsync({
            params: {
                orderId: orderId, dishId: idDish
            }
        }, {
            onSuccess: () => {
                setDishNumber(prev => prev + 1);
                reload()
            }
        })
    }

    const handleAddDishToOrder = async () => {
        await editAmountDishToOrder.mutateAsync({
            params: {
                orderId: orderId, dishId: idDish, amount: dishNumber + 1
            }
        }, {
            onSuccess: () => {
                setDishNumber(prev => prev + 1);
                reload()
            }
        })
    }

    const handleRemoveOrder = async () => {
        await editAmountDishToOrder.mutateAsync({
            params: {
                orderId: orderId, dishId: idDish, amount: dishNumber - 1
            }
        }, {
            onSuccess: () => {
                setDishNumber(prev => prev - 1);
                reload()
            }
        })
    }

    return {
        state: { dishNumber },
        functions: { handleAddOrder, handleRemoveOrder, handleAddDishToOrder }
    }
}