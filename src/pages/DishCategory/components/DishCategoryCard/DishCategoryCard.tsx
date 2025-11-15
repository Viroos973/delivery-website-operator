import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {PencilLine, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useDishCategoryCard} from "@/pages/DishCategory/components/DishCategoryCard/hooks/useDishCategoryCard.tsx";

interface DishCategoryCardProps {
    id: string;
    name: string;
    description: string;
    setDishCategory: (dishCategory: DishCategorySchema, id: string) => void;
    openCancelDelete: () => void;
    refetchCategories: () => void;
}

const DishCategoryCard = ({ id, name, description, setDishCategory, openCancelDelete, refetchCategories }: DishCategoryCardProps) => {
    const { functions } = useDishCategoryCard(setDishCategory, openCancelDelete, refetchCategories)

    return (
        <Card className="w-[300px] h-[320px] flex flex-col overflow-hidden">
            <CardContent className="flex-grow">
                <CardTitle className="text-center text-xl mb-3">
                    {name}
                </CardTitle>
                <p className="line-clamp-7 text-center break-words overflow-wrap-anywhere">
                    {description}
                </p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row justify-end items-center w-full gap-2">
                    <Button className="cursor-pointer" onClick={() => functions.handleEditCategory(id, name, description)}>
                        <PencilLine/>
                    </Button>
                    <Button className="cursor-pointer" onClick={() => functions.handleDeleteCategory(id)}>
                        <Trash2/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default DishCategoryCard