import { useDeleteDishByIdFromOrderMutation } from "@/utils/api/hooks/useDeleteDishByIdFromOrderMutation";
import { useGetOrderByIdQuery } from "@/utils/api/hooks/useGetOrderByIdQuery";
import { usePutChangeOperatorMutation } from "@/utils/api/hooks/usePutChangeOperatorForOrderMutation";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import {useMemo, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import {TOTAL_COST_NOT_UPDATE} from "@/utils/constants/envBugs.ts";

const ITEMS_PER_PAGE = 8;
export const useOrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const order = useGetOrderByIdQuery({ orderId: id || "" })
    const changeOperator = usePutChangeOperatorMutation()
    const deleteDishFromOrder = useDeleteDishByIdFromOrderMutation()

    const { authenticated, roles, userId } = useAuth()
    const firstPriceRef = useRef<number | null>(null);
    const shouldPreservePriceRef = useRef(false);
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isChangeOperator, setIsChangeOperator] = useState<boolean>(false);
    const [isAddDish, setIsAddDish] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(false);
    const [comment, setComment] = useState<NewComment>(
        {
            comment: ''
        }
    );

    const totalPrice = useMemo(() => {
        const currentPrice = order.data?.data.reservation.price;

        if (currentPrice) {
            if (!shouldPreservePriceRef.current) {
                firstPriceRef.current = currentPrice;
            }
        }

        if (TOTAL_COST_NOT_UPDATE && firstPriceRef.current) {
            shouldPreservePriceRef.current = true;
            return firstPriceRef.current;
        }

        shouldPreservePriceRef.current = false;
        return currentPrice;
    }, [order.data]);

    const totalPage = useMemo(() => {
        if (!order.data?.data.meal) return 0

        return Math.ceil(order.data.data.meal.length / ITEMS_PER_PAGE);
    }, [order.data?.data.meal]);

    const makeOperator = (async (id: string) => {
        await changeOperator.mutateAsync({
            params: {
                orderId: id, operatorId: userId
            }
        })

        await order.refetch();
    })

    const handleDeleteDishFromOrder = async (dishId: string) => {
        await deleteDishFromOrder.mutateAsync({ params: { orderId: order.data?.data.reservation.id, dishId: dishId } },
            {
                onSuccess: () => order.refetch()
            })
    }

    return {
        state: { order, isComment, comment, isChangeOperator, isAddDish, isHistory, authenticated, roles, totalPage, id, userId, totalPrice },
        functions: {
            setIsComment,
            setComment,
            makeOperator,
            handleDeleteDishFromOrder,
            setIsChangeOperator,
            setIsAddDish,
            setIsHistory
        }
    }
}