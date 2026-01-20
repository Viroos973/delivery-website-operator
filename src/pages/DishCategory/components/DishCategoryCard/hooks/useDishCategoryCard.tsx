import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useDeleteCategoryByIdMutation} from "@/utils/api/hooks/useDeleteCategoryByIdMutation.ts";
import {NO_OPEN_ERROR_DELETE_DISH, NO_REFETCH_DELETE} from "@/utils/constants/envBugs.ts";

export const useDishCategoryCard = (setDishCategory: (dishCategory: DishCategorySchema, id: string) => void, openCancelDelete: () => void, refetchCategories: () => void) => {
    const deleteDishCategory = useDeleteCategoryByIdMutation()

    const handleEditCategory = (id: string, name: string, description: string) => {
        const dishCategory = {
            name: name,
            description: description
        }
        setDishCategory(dishCategory, id)
    }

    const handleDeleteCategory = async (id: string) => {
        await deleteDishCategory.mutateAsync({ params: { id } },
            {
                onSuccess: () => {
                    if (!NO_REFETCH_DELETE) refetchCategories()
                },
                onError: (error) => {
                    if (!NO_OPEN_ERROR_DELETE_DISH && error.response?.status !== 401) openCancelDelete()
                }
            })
    }

    return {
        functions: { handleEditCategory, handleDeleteCategory }
    }
}