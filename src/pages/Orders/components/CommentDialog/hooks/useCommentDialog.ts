import { useForm } from "react-hook-form";
import type { GetCommentSchema } from "../constants/CommentShema";
import { useEffect } from "react";
import { usePutAddCommentMutation } from "@/utils/api/hooks/usePutAddCommentMutation";

export const useCommentDialog = (isComment: boolean,
    setIsComment: (isComment: boolean) => void, order: Order) => {
    const addComment = usePutAddCommentMutation()

    const newCommentForm = useForm<GetCommentSchema>({
        defaultValues: {
            comment: ''
        }
    })

    const onSubmit = newCommentForm.handleSubmit(async (value) => {
        await addComment.mutateAsync({
            params: {
                orderId: order.reservation.id, comment: value.comment
            }
        })

        // reloadOperators()
        newCommentForm.reset()
        setIsComment(false)
    })

    useEffect(() => {
        if (!isComment) {
            newCommentForm.reset({
                comment: ''
            })
        }
    }, [isComment])

    return {
        state: {},
        form: newCommentForm,
        functions: { onSubmit }
    }
}