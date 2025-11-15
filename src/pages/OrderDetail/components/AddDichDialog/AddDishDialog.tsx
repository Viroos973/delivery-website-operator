import DishCard from "@/components/DishCard/DishCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useAddDishDialog } from "./hooks/useAddDishDialog";
import AddOrderBtn from "@/components/DishCard/components/AddOrderBtn/AddOrderBtn";

interface AddDishDialogProps {
    isAddDish: boolean;
    setIsAddDish: (isAddDish: boolean) => void;
    orderId: string;
    reload: () => void;
    orderDish:  Meal[];
}

const AddDishDialog = ({ isAddDish, setIsAddDish, orderId, reload, orderDish }: AddDishDialogProps) => {
    const { state, functions } = useAddDishDialog(setIsAddDish, orderDish);

    return (
        <Dialog open={isAddDish} onOpenChange={setIsAddDish}>
            <DialogContent className="mx-auto max-w-md h-[800px] overflow-hidden w-auto">
                <DialogHeader>
                    <DialogTitle>Меню</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    { state.filteredDishes.length > 0
                        ? state.filteredDishes.map(dish => (
                            <DishCard key={dish.id} {...dish}>
                                <AddOrderBtn className="w-full" idDish={dish.id} orderId={orderId}
                                             onClick={functions.reloadDishes} reload={reload} />
                            </DishCard>
                        )) : (
                            <p className="text-center text-gray-500 py-8">
                                {"Все блюда уже добавлены в заказ"}
                            </p>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddDishDialog;