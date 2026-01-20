import { useDeleteOperatorByIdMutation } from "@/utils/api/hooks/useDeleteOperatorByIdMutation";
import { useGetOperatorsQuery } from "@/utils/api/hooks/useGetOperatorsQuery";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {NO_REFETCH_DELETE} from "@/utils/constants/envBugs.ts";

const ITEMS_PER_PAGE = 8;
export const useOperators = () => {
    const deleteOperator = useDeleteOperatorByIdMutation()
    const operators = useGetOperatorsQuery()

    const [searchParams] = useSearchParams();
    const [newOperator, setNewOperator] = useState<NewOperatorDTO>({
        fullName: '',
        password: '',
        phone: '',
        username: ''
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDeleteOperator = async (operatorId: string) => {
        await deleteOperator.mutateAsync({ params: { operatorId } },
            {
                onSuccess: () => {
                    if (!NO_REFETCH_DELETE) operators.refetch()
                }
            })
    }

    const displayedData = useMemo(() => {
        if (!operators.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1") - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return operators.data.data.slice(startItem, startItem + ITEMS_PER_PAGE)
    }, [operators.data, searchParams]);

    const totalPage = useMemo(() => {
        if (!operators.data) return 0

        return Math.ceil(operators.data.data.length / ITEMS_PER_PAGE);
    }, [operators.data]);

    return {
        state: { isOpen, newOperator, displayedData, totalPage, operators },
        functions: {
            setIsOpen,
            setNewOperator,
            handleDeleteOperator
        }
    }
}