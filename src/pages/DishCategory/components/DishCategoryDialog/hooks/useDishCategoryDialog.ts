import {
    dishCategorySchema,
    type DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {usePostCreateCategoryMutation} from "@/utils/api/hooks/usePostCreateCategoryMutation.ts";
import {usePutUpdateCompanyMutation} from "@/utils/api/hooks/usePutUpdateCategoryMutation.ts";

export const useDishCategoryDialog = (setIsOpen: (isOpen: boolean) => void, reloadCategories: () => void, initialData?: DishCategorySchema, categoryId?: string) => {
    const createCategory = usePostCreateCategoryMutation()
    const updateCategory = usePutUpdateCompanyMutation()

    const categoryForm = useForm<DishCategorySchema>({
        resolver: zodResolver(dishCategorySchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || ''
        }
    });

    const onSubmit = categoryForm.handleSubmit(async (value) => {
        if (!categoryId) {
            await createCategory.mutateAsync({ params: { name: value.name, description: value.description } })
        } else {
            await updateCategory.mutateAsync({ params: { name: value.name, description: value.description, id: categoryId } })
        }
        
        reloadCategories()
        categoryForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        categoryForm.reset({
            name: initialData?.name || '',
            description: initialData?.description || ''
        });
    }, [initialData]);

    return {
        form: categoryForm,
        functions: { onSubmit }
    }
}