import { useDeleteDishByIdMutation } from "@/utils/api/hooks/useDeleteDishByIdMutation";
import { useGetFoodsWithFiltersQuery } from "@/utils/api/hooks/useGetFoodsWithFiltersQuery";
import { usePatchUpdateAvailabilityDishMutation } from "@/utils/api/hooks/usePatchUpdateAvailabilityDishMutation";
import { MIXED_BUTTONS_AVAILABLE_DISHES } from "@/utils/constants/envBugs";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useDishManagement = () => {
    const deleteDish = useDeleteDishByIdMutation()
    const doAvailable = usePatchUpdateAvailabilityDishMutation()
    const dishes = useGetFoodsWithFiltersQuery({})

    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [editDishId, setEditDishId] = useState<string | undefined>(undefined)

    const displayedData = useMemo(() => {
        if (!dishes.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1", 10) - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return dishes.data.data.slice(startItem, startItem + ITEMS_PER_PAGE) || [];
    }, [dishes.data, searchParams]);

    const totalPage = useMemo(() => {
        if (!dishes.data) return 0

        return Math.ceil(dishes.data.data.length / ITEMS_PER_PAGE);
    }, [dishes.data]);

    const handleOpenEdit = (id: string) => {
        setEditDishId(id);
        setIsOpenEdit(true);
    }

    const handleDeleteDish = async (id: string) => {
        await deleteDish.mutateAsync({ params: { id } },
            {
                onSuccess: () => dishes.refetch()
            })
    }

    const handleDoAvailable = async (id: string, available: boolean) => {
        if (MIXED_BUTTONS_AVAILABLE_DISHES) {
            await doAvailable.mutateAsync({ params: { id, available: !available } },
                {
                    onSuccess: () => dishes.refetch()
                })
            return;
        }

        await doAvailable.mutateAsync({ params: { id, available } },
            {
                onSuccess: () => dishes.refetch()
            })
    }

    return {
        state: { isOpen, isOpenEdit, dishes, editDishId, displayedData, totalPage },
        functions: {
            setIsOpen,
            setIsOpenEdit,
            handleDeleteDish,
            handleDoAvailable,
            setEditDishId,
            handleOpenEdit
        }
    }
}
