import { Headphones, MessageSquare, RussianRuble, User } from "lucide-react";
import CommentDialog from "../Orders/components/CommentDialog/CommentDialog";
import { useOrderDetail } from "./hooks/useOrderDetail";
import { Button } from "@/components/ui/button";
import DishItem from "./components/DishItem";
import CustomPagination from "@/components/Pagination/CustomPagination";
import HistoryDialog from "./components/HistoryDialog/HistoryDialog";
import AddDishDialog from "./components/AddDichDialog/AddDishDialog";
import ChangeOperatorDialog from "./components/ChangeOperatorDialog/ChangeOperatorDialog";
import { TranslateStatus } from "@/utils/constants/translateStatus";
import { getPaymentMethod } from "@/utils/helpers/getPaymentMethod.ts";
import { APPOINT_RESPONSIBLE_OPERATOR } from "@/utils/constants/envBugs";

const OrderDetail = () => {
    const { state, functions } = useOrderDetail();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            {state.authenticated && state.roles.includes('OPERATOR')
                && (state.order.data?.data.reservation.operatorId !== state.userId)
                && ((state.order.data?.data.reservation.status === "NEW") || APPOINT_RESPONSIBLE_OPERATOR) ? (
                <div className="flex justify-end w-[90%]">
                    <Button className="cursor-pointer" onClick={() => functions.makeOperator(state.order.data?.data.reservation.id!)}>
                        Назначить себя оператором
                    </Button>
                </div>
            ) : null}
            <div className="flex flex-col w-[90%] border border-black rounded-lg divide-y divide-black mb-8">
                <div className="flex flex-row justify-between p-8 items-center">
                    <div className="flex flex-row gap-4">
                        <span className="text-2xl font-medium underline">
                            {`Заказ ${state.order.data?.data.reservation.orderNumber ? state.order.data?.data.reservation.orderNumber : ""}`}
                        </span>
                        {state.authenticated && state.roles.includes('OPERATOR') ? (
                            <MessageSquare className=" flex items-end h-[60%] cursor-pointer"
                                onClick={() => functions.setIsComment(true)} />
                        ) : null}
                        {state.order.data?.data && (
                            <CommentDialog isComment={state.isComment} setIsComment={functions.setIsComment}
                                order={state.order.data?.data} />
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <span className="text-3xl font-medium">{state.totalPrice}</span>
                            <RussianRuble className="w-[22px] h-[22px]" />
                        </div>
                        <span className="font-medium">{getPaymentMethod(state.order.data?.data.reservation.payWay)}</span>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-8">
                    <div className="flex flex-row items-center gap-4">
                        <User className="w-[36px] h-[36px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Клиент:</span>
                            <span>{state.order.data?.data.reservation.phoneNumber}</span>
                        </div>
                    </div>
                    <div>
                        <Button className="cursor-pointer" onClick={() => functions.setIsHistory(true)}>
                            {TranslateStatus[state.order.data?.data.reservation.status || '']}
                        </Button>
                        {state.order.data?.data && (
                            <HistoryDialog isHistory={state.isHistory} setIsHistory={functions.setIsHistory}
                                order={state.order.data?.data} />
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-8">
                    <div className="flex flex-row items-center gap-4">
                        <Headphones className="w-[36px] h-[36px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Ответсвенный оператор:</span>
                            {state.order.data?.data.reservation.operatorId ? (
                                <span>{state.order.data.data.reservation.operatorName}</span>
                            ) : (
                                <span>Оператор не назначен</span>
                            )}
                        </div>
                    </div>
                    {state.authenticated && state.roles.includes('ADMIN') ? (
                        <div>
                            <Button className="cursor-pointer" onClick={() => functions.setIsChangeOperator(true)}>
                                Сменить оператора
                            </Button>
                            <ChangeOperatorDialog isChangeOperator={state.isChangeOperator}
                                setIsChangeOperator={functions.setIsChangeOperator} orderId={state.id || ''}
                                reloadOrder={state.order.refetch} />
                        </div>
                    ) : null}
                </div>
                <div className="flex flex-col p-8 gap-8">
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-2xl font-medium">Состав заказа:</span>
                        {state.authenticated && state.roles.includes('OPERATOR') && state.order.data ? (
                            <div>
                                <Button className="cursor-pointer" onClick={() => functions.setIsAddDish(true)}>
                                    Добавить блюдо
                                </Button>
                                <AddDishDialog isAddDish={state.isAddDish} setIsAddDish={functions.setIsAddDish}
                                    orderId={state.order.data.data.reservation.id} reload={state.order.refetch}
                                    orderDish={state.order.data?.data.meal} />
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-col w-full border border-black dish-list-item divide-y divide-black">
                        {state.order.data?.data.meal.map(meal => (
                            <DishItem key={meal.id} meal={meal} handleDeleteDishFromOrder={functions.handleDeleteDishFromOrder}
                                roles={state.roles} authenticated={state.authenticated}
                                orderId={state.order.data?.data.reservation.id!} reload={state.order.refetch}
                                isDeleteBtnLock={(state.order.data && state.order.data.data.meal.length < 2) || false} />
                        ))}
                    </div>
                    <CustomPagination totalPages={state.totalPage} />
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;