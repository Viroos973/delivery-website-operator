import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {type GetReasonSchema, reasonSchema} from "../constants/ReasonShema";
import { usePutDeclineOrderMutation } from "@/utils/api/hooks/usePutDeclineOrderMutation";
import {zodResolver} from "@hookform/resolvers/zod";

export const useReasonDialog = (isReason: boolean,
    setIsReason: (isReason: boolean) => void, order: Order,
    reloadOrder: () => void) => {
    const declineOrder = usePutDeclineOrderMutation()

    const newReasonForm = useForm<GetReasonSchema>({
        resolver: zodResolver(reasonSchema),
        defaultValues: {
            reason: ''
        }
    })

    const onSubmit = newReasonForm.handleSubmit(async (value) => {
        await declineOrder.mutateAsync({
            params: {
                orderId: order.reservation.id, declineReason: value.reason
            }
        })

        reloadOrder()
        newReasonForm.reset()
        setIsReason(false)
    })

    useEffect(() => {
        if (!isReason) {
            newReasonForm.reset({
                reason: ''
            })
        }
    }, [isReason])

    return {
        state: {},
        form: newReasonForm,
        functions: { onSubmit }
    }
}