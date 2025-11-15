import {useFieldArray, useForm} from "react-hook-form"
import {type EditDishSchema, editDishSchema} from "../constants/EditDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePutUpdateDishMutation } from "@/utils/api/hooks/usePutUpdateDishMutation"
import {useGetDishByIdQuery} from "@/utils/api/hooks/useGetDishByIdQuery.ts";
import {useGetCategoriesQuery} from "@/utils/api/hooks/useGetCategoriesQuery.ts";

export const useEditDishDialog = (
    setIsOpen: (isOpen: boolean) => void,
    reloadDishes: () => void,
    dishId?: string) => {
    const editDish = usePutUpdateDishMutation()
    const dish = useGetDishByIdQuery({ id: dishId! }, {
        options: {
            enabled: !!dishId
        }
    })
    const categories = useGetCategoriesQuery();

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const ingredients = [
        {
            id: "ONION",
            label: "Лук",
        },
        {
            id: "MEAT",
            label: "Мясо",
        },
        {
            id: "BIRD",
            label: "Птица",
        },
        {
            id: "FISH",
            label: "Рыба",
        },
        {
            id: "EGGS",
            label: "Яйца",
        },
        {
            id: "NUTS",
            label: "Орехи",
        },
        {
            id: "MILKY_PRODUCTS",
            label: "Молочные продукты",
        },
        {
            id: "BERRIES",
            label: "Ягоды",
        },
        {
            id: "GRASS",
            label: "Зелень",
        },
        {
            id: "SPICY",
            label: "Острое",
        }
    ] as const

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const editDishForm = useForm<EditDishSchema>({
        resolver: zodResolver(editDishSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            price: 0,
            rate: 0,
            photos: [],
            description: '',
            ingredients: [],
            isAvailable: true
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: editDishForm.control,
        name: "photos" as never
    })

    const addPhoto = () => {
        append("")
    }

    const removePhoto = (index: number) => {
        remove(index)
    }

    const updatePhoto = (index: number, newUrl: string) => {
        editDishForm.setValue(`photos.${index}`, newUrl)
    }

    const onSubmit = editDishForm.handleSubmit(async (value) => {
        if (!dishId) return
        await editDish.mutateAsync({
            params: {
                id: dishId, name: value.name, categoryId: value.categoryId,
                photos: value.photos, rate: value.rate,
                price: value.price, description: value.description,
                ingredients: value.ingredients, isAvailable: value.isAvailable
            }
        })

        reloadDishes()
        editDishForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!dish.data) return

        editDishForm.reset({
            name: dish.data.data.foodDetails.name,
            categoryId: dish.data.data.foodDetails.categoryId,
            price: dish.data.data.foodDetails.price,
            rate: dish.data.data.foodDetails.rate,
            photos: dish.data.data.foodDetails.photos,
            description: dish.data.data.foodDetails.description,
            ingredients: dish.data.data.foodDetails.ingredients,
            isAvailable: dish.data.data.foodDetails.isAvailable
        })
        setSelectedCategory(dish.data.data.foodDetails.categoryId)
    }, [dish.data]);

    const handleSetCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
        editDishForm.setValue("categoryId", categoryId);
    }

    return {
        state: { selectedFile, selectedCategory, ingredients, categories, fields },
        form: editDishForm,
        functions: {
            onSubmit,
            setSelectedFile,
            handleFileChange,
            handleSetCategory,
            addPhoto,
            removePhoto,
            updatePhoto
        }
    }
}