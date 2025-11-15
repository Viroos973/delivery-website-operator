import { useGetOperatorsQuery } from "@/utils/api/hooks/useGetOperatorsQuery";
import { usePutChangeOperatorMutation } from "@/utils/api/hooks/usePutChangeOperatorForOrderMutation";
import { useMemo } from "react"

const ITEMS_PER_PAGE = 8;
export const useChangeOperatorDialog = (
    setIsChangeOperator: (isChangeOperator: boolean) => void, orderId: string, reloadOrder: () => void) => {
    const operators = useGetOperatorsQuery()
    const changeOperator = usePutChangeOperatorMutation()

    const changeOperators = (async (operatorId: string) => {
        await changeOperator.mutateAsync({
            params: {
                orderId: orderId, operatorId: operatorId
            }
        })

        reloadOrder()
        setIsChangeOperator(false);
    })

    const totalPage = useMemo(() => {
        if (!operators.data) return 0

        return Math.ceil(operators.data.data.length / ITEMS_PER_PAGE);
    }, [operators.data]);

    return {
        state: { operators, totalPage },
        functions: { changeOperators }
    }
}