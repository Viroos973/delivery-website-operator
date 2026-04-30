import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useOperators } from "../hooks/useOperators";
import React from "react";

interface OperatorItemProps {
    operator: Operator;
}

const OperatorItem: React.FC<OperatorItemProps> = ({ operator }) => {
    const { functions } = useOperators();

    return (
        <div className="flex flex-col w-[100%] p-4 md:p-10 gap-3 operator-item">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <span className="text-2xl font-medium">{operator.fullName}</span>
                <Button className="cursor-pointer w-full md:w-auto text-sm md:text-base" onClick={() => functions.handleDeleteOperator(operator.id)}>
                    Удалить оператора
                </Button>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Phone className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-sm md:text-base">Номер телефона:</span>
                    <span className="text-sm md:text-base">{operator.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default OperatorItem;