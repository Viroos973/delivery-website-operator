import DishCard from "@/components/DishCard/DishCard";
import { useDishManagement } from "./hooks/useDishManagement";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { Lock, LockOpen, PencilLine, Trash2 } from "lucide-react";
import NewDishDialog from "./components/NewDishDialog/NewDishDialog";
import EditDishDialog from "./components/EditDishDialog/EditDishDialog";

const DishManagement = () => {
    const { state, functions } = useDishManagement();

    return (
        <div className="flex flex-col mt-8 mb-8 gap-12 w-full px-16">
            <div className='flex flex-row justify-between items-center'>
                <span className='text-4xl font-medium text-center flex-1'>Управление блюдами</span>
                <Button className="cursor-pointer" onClick={() => functions.setIsOpen(true)}>
                    {"Добавить блюдо"}
                </Button>
                <NewDishDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} reloadDishes={state.dishes.refetch} />
            </div>
            <div className="flex items-center justify-around flex-wrap gap-16">
                {state.displayedData.map(dish => (
                    <DishCard key={dish.id} {...dish}>
                        <div className="flex flex-row justify-between items-center w-full">
                            {dish.isAvailable ? (
                                <Button className="cursor-pointer lock-btn"
                                        onClick={() => functions.handleDoAvailable(dish.id, false)}>
                                    <Lock />
                                </Button>
                            ) : (
                                <Button className="cursor-pointer lock-open-btn"
                                        onClick={() => functions.handleDoAvailable(dish.id, true)}>
                                    <LockOpen />
                                </Button>
                            )}
                            <div className="flex flex-row gap-1">
                                <Button className="cursor-pointer edit-btn" onClick={() => functions.handleOpenEdit(dish.id)}>
                                    <PencilLine />
                                </Button>
                                <Button className="cursor-pointer delete-btn" onClick={() => functions.handleDeleteDish(dish.id)}>
                                    <Trash2 />
                                </Button>
                            </div>
                        </div>
                    </DishCard>
                ))}
                <EditDishDialog isOpen={state.isOpenEdit} setIsOpen={functions.setIsOpenEdit}
                                reloadDishes={state.dishes.refetch} dishId={state.editDishId} />
            </div>
            <CustomPagination totalPages={state.totalPage} />
        </div>
    )
}

export default DishManagement;