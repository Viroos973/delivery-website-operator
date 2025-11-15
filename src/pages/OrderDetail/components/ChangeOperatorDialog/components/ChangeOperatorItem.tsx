import { Phone } from "lucide-react";
import React from "react";

interface ChangeOperatorItemProps {
    operator: Operator;
    changeOperators: (orderId: string) => void;
}

const ChangeOperatorItem: React.FC<ChangeOperatorItemProps> = ({ operator, changeOperators }) => {
    return (
        <div className="flex flex-col w-[100%] p-6 gap-3 border-b border-gray-300 first:pt-0 last:border-b-0 last:pb-0 cursor-pointer"
            onClick={() => changeOperators(operator.id)}>
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-medium">{operator.fullName}</span>
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

export default ChangeOperatorItem;