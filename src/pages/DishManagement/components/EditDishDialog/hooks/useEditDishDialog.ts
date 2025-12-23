import {useFieldArray, useForm} from "react-hook-form"
import {type EditDishSchema, editDishSchema} from "../constants/EditDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePutUpdateDishMutation } from "@/utils/api/hooks/usePutUpdateDishMutation"
import {useGetDishByIdQuery} from "@/utils/api/hooks/useGetDishByIdQuery.ts";
import {useGetCategoriesQuery} from "@/utils/api/hooks/useGetCategoriesQuery.ts";
import {PHOTO_NOT_DELETE} from "@/utils/constants/envBugs.ts";

export const useEditDishDialog = (setIsOpen: (isOpen: boolean) => void, reloadDishes: () => void, isOpen: boolean, dishId?: string) => {
    const editDish = usePutUpdateDishMutation()
    const dish = useGetDishByIdQuery({ id: dishId! }, {
        options: {
            enabled: (!!dishId && isOpen)
        }
    })
    const categories = useGetCategoriesQuery();

    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
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

    const editDishForm = useForm<EditDishSchema>({
        resolver: zodResolver(editDishSchema),
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
        control: editDishForm.control,
        name: "photos" as never
    })

    const addPhoto = () => {
        append("")
    }

    const removePhoto = (fileIndex: number, photoUrl?: string) => {
        if (photoUrl && dish.data?.data.foodDetails.photos.includes(photoUrl)) {
            if (!PHOTO_NOT_DELETE) setPhotosToDelete(prev => [...prev, photoUrl])
            setExistingPhotos(prev => prev.filter(photo => photo !== photoUrl))
        } else {
            setSelectedFile(prev => prev.filter((_, index) => index !== (fileIndex - existingPhotos.length)))
        }

        remove(fileIndex)
    }

    const onFileSelected = (file: File, index: number) => {
        setSelectedFile(prev => [...prev, file])
        editDishForm.setValue(`photos.${index}`, URL.createObjectURL(file))
    }

    const onSubmit = editDishForm.handleSubmit(async (value) => {
        if (!dishId) return
        await editDish.mutateAsync({
            params: {
                id: dishId, name: value.name, categoryId: value.categoryId,
                newPhotos: selectedFile, photosToDelete: photosToDelete,
                price: value.price, description: value.description,
                ingredients: value.ingredients
            }
        })

        reloadDishes()
        editDishForm.reset()
        setSelectedFile([])
        setPhotosToDelete([])
        setExistingPhotos(dish.data?.data.foodDetails.photos || [])
        setIsOpen(false)
    })

    useEffect(() => {
        if (!dish.data) return

        editDishForm.reset({
            name: dish.data.data.foodDetails.name,
            categoryId: dish.data.data.foodDetails.categoryId,
            price: dish.data.data.foodDetails.price,
            photos: dish.data.data.foodDetails.photos,
            description: dish.data.data.foodDetails.description,
            ingredients: dish.data.data.foodDetails.ingredients
        })
        setSelectedFile([])
        setPhotosToDelete([])
        setExistingPhotos(dish.data.data.foodDetails.photos)
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
            handleSetCategory,
            addPhoto,
            removePhoto,
            onFileSelected
        }
    }
}