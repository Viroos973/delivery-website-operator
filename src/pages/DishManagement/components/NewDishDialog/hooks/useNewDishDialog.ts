import {useFieldArray, useForm} from "react-hook-form"
import {type NewDishSchema, newDishSchema} from "../constants/NewDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostCreateDishMutation } from "@/utils/api/hooks/usePostCreateDishMutation";
import {useGetCategoriesQuery} from "@/utils/api/hooks/useGetCategoriesQuery.ts";

export const useNewDishDialog = (setIsOpen: (isOpen: boolean) => void, isOpen: boolean, reloadDishes: () => void) => {
    const createDish = usePostCreateDishMutation()
    const categories = useGetCategoriesQuery();

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState(null);
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

    const newDishForm = useForm<NewDishSchema>({
        resolver: zodResolver(newDishSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            price: 0,
            rate: 0,
            photos: [],
            description: '',
            ingredients: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: newDishForm.control,
        name: "photos" as never
    })

    const addPhoto = () => {
        append("")
    }

    const removePhoto = (index: number) => {
        remove(index)
    }

    const updatePhoto = (index: number, newUrl: string) => {
        newDishForm.setValue(`photos.${index}`, newUrl)
    }

    const onSubmit = newDishForm.handleSubmit(async (value) => {
        await createDish.mutateAsync({
            params: {
                name: value.name, categoryId: value.categoryId,
                photos: value.photos, rate: value.rate,
                price: value.price, description: value.description,
                ingredients: value.ingredients
            }
        })

        reloadDishes()
        newDishForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            newDishForm.reset({
                name: '',
                categoryId: '',
                price: 0,
                rate: 0,
                photos: [],
                description: '',
                ingredients: []
            })
        }
    }, [isOpen])

    const handleSetCategory = (categoryId: string) => {
        setSelectedCategory(categoryId);
        newDishForm.setValue("categoryId", categoryId);
    }

    return {
        state: { selectedFile, ingredients, categories, selectedCategory, fields },
        form: newDishForm,
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