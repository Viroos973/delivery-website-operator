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
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
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

    const newDishForm = useForm<NewDishSchema>({
        resolver: zodResolver(newDishSchema),
        defaultValues: {
            name: '',
            categoryId: '',
            price: 0,
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

    const removePhoto = (fileIndex: number) => {
        setSelectedFile(prev => prev.filter((_, index) => index !== fileIndex))
        remove(fileIndex)
    }

    const onFileSelected = (file: File, index: number) => {
        setSelectedFile(prev => [...prev, file])
        newDishForm.setValue(`photos.${index}`, URL.createObjectURL(file))
    }

    const onSubmit = newDishForm.handleSubmit(async (value) => {
        await createDish.mutateAsync({
            params: {
                name: value.name, categoryId: value.categoryId,
                photos: selectedFile,
                price: value.price, description: value.description,
                ingredients: value.ingredients
            }
        })

        reloadDishes()
        newDishForm.reset()
        setSelectedFile([])
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            newDishForm.reset({
                name: '',
                categoryId: '',
                price: 0,
                photos: [],
                description: '',
                ingredients: []
            })
            setSelectedFile([])
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
            onFileSelected,
            handleSetCategory,
            addPhoto,
            removePhoto
        }
    }
}