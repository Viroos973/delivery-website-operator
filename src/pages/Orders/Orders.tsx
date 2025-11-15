import { useOrders } from "./hooks/useOrders";
import OrderItem from "./components/OrderItem/OrderItem.tsx";
import {SearchIcon} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ROUTES} from "@/utils/constants/routes.ts";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

const Orders = () => {
    const { state, functions } = useOrders();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            <span className='text-4xl font-medium'>Управление заказами</span>
            {state.authenticated && state.roles.includes('ADMIN') ? (
                <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between w-[90%]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Input
                            defaultValue={state.filters.operators}
                            leftIcon={<SearchIcon className='h-5 w-5'/>}
                            placeholder="Поиск..."
                            onChange={(e) => functions.debouncedSearchByName(e.target.value)}
                            className='h-10 sm:max-w-64 w-full'
                        />
                        <Select value={state.filters.statuses || "all"} onValueChange={functions.handleSelectStatus}>
                            <SelectTrigger className="!h-10 sm:max-w-64 w-full">
                                <SelectValue placeholder="Категория блюда"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Все категории</SelectItem>
                                    {state.statuses.map(status => (
                                        <SelectItem value={status.id}>{status.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <NavLink to={ROUTES.STATISTICS}>
                        <Button className="cursor-pointer h-10 md:max-w-64 w-full">
                            {"Статистика заказов"}
                        </Button>
                    </NavLink>
                </div>
            ) : (
                <div className="flex items-center gap-8 w-[90%]">
                    <div className="flex justify-items-start items-center gap-4">
                        <span>Мои заказы</span>
                        <Switch className="cursor-pointer" checked={state.isMyOrder}
                                onCheckedChange={(checked: boolean) => functions.handleSetIsMyOrder(checked)}/>
                    </div>
                    <div className="flex justify-items-start items-center gap-4">
                        <span>Заказы без оператора</span>
                        <Switch className="cursor-pointer" checked={state.isOrderWithoutOperator}
                                onCheckedChange={(checked: boolean) => functions.handleSetWithoutOperator(checked)}/>
                    </div>
                </div>
            )}
            {state.activeQuery.data && state.activeQuery.data?.data.length > 0 ? (
                <div
                    className='flex flex-col items-center w-[90%] border border-black rounded-lg divide-y divide-black mb-4'>
                    {state.activeQuery.data.data.map(order => (
                        <OrderItem order={order} reloadOrder={state.activeQuery.refetch}/>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl font-bold">{"Заказов нет"}</p>
            )}
        </div>
    )
}

export default Orders;