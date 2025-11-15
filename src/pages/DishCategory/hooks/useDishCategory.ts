import {useMemo, useState} from "react";
import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useGetCategoriesQuery} from "@/utils/api/hooks/useGetCategoriesQuery.ts";
import {useSearchParams} from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useDishCategory = () => {
    const categories = useGetCategoriesQuery();

    const [searchParams] = useSearchParams();
    const [categoryData, setCategoryData] = useState<DishCategorySchema | undefined>(undefined)
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const [canselDeleteOpen, setCanselDeleteOpen] = useState(false)

    const openEditCategory = (dishCategory: DishCategorySchema, id: string) => {
        setCategoryData(dishCategory)
        setCategoryId(id)
        setIsOpen(true)
    }

    const openCreateCategory = () => {
        setCategoryData(undefined)
        setCategoryId(undefined)
        setIsOpen(true)
    }

    const displayedData = useMemo(() => {
        if (!categories.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1") - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return categories.data.data.slice(startItem, startItem + ITEMS_PER_PAGE)
    }, [categories.data, searchParams]);

    const totalPage = useMemo(() => {
        if (!categories.data) return 0

        return Math.ceil(categories.data.data.length / ITEMS_PER_PAGE);
    }, [categories.data]);

    return {
        state: { categories, categoryId, isOpen, categoryData, canselDeleteOpen, displayedData, totalPage },
        functions: { setIsOpen, openEditCategory, openCreateCategory, setCanselDeleteOpen, refetch: categories.refetch }
    }
}