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
        <div className="flex flex-col w-[100%] p-10 gap-3 operator-item">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-medium">{operator.fullName}</span>
                <Button className="cursor-pointer" onClick={() => functions.handleDeleteOperator(operator.id)}>
                    Удалить аккаунт оператора
                </Button>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Phone className="w-[32px] h-[32px]" />
                <div className="flex flex-col gap-1.5">
                    <span className="font-medium">Номер телефона:</span>
                    <span className="">{operator.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default OperatorItem;