import { useGetFoodsWithFiltersQuery } from "@/utils/api/hooks/useGetFoodsWithFiltersQuery";
import { useMemo } from "react";
import {ERROR_ADD_NEW_DISH_INTO_ORDER} from "@/utils/constants/envBugs.ts";

export const useAddDishDialog = (setIsAddDish: (isAddDish: boolean) => void, orderDish:  Meal[]) => {
    const dishes = useGetFoodsWithFiltersQuery({
        search: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        categoryId: undefined,
        sortBy: undefined,
        sortDirection: undefined,
        includeIngredients: undefined
    })

    const reloadDishes = async () => {
        await dishes.refetch();
        setIsAddDish(false);
    }

    const filteredDishes = useMemo(() => {
        const orderDishIdsSet = new Set(orderDish.map(dish => dish.id));
        return dishes.data?.data.filter(dish =>
            (ERROR_ADD_NEW_DISH_INTO_ORDER && orderDishIdsSet.has(dish.id)) || (!ERROR_ADD_NEW_DISH_INTO_ORDER && !orderDishIdsSet.has(dish.id))
        ) || [];
    }, [dishes.data?.data, orderDish]);

    return {
        state: { filteredDishes },
        functions: { reloadDishes }
    }
}