import {useParams} from "react-router-dom";
import {useGetDishByIdQuery} from "@/utils/api/hooks/useGetDishByIdQuery.ts";

export const useDishDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dish = useGetDishByIdQuery({ id: id! })

    return {
        state: { dish, id }
    }
}