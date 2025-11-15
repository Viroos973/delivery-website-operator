import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type Status = { id: string; name: string }

interface SelectStatusProps {
    selected: Status
    statuses: Status[]
    onChange: (id: string, orderId: string) => void
    orderId: string
}

export const SelectStatus = ({ selected, statuses, onChange, orderId }: SelectStatusProps) => {
    const handleChange = (id: string) => {
        onChange(id, orderId);
    };

    return (
        <Select value={selected.id} onValueChange={handleChange}>
            <SelectTrigger className="!h-10 min-w-[200px] w-full bg-black text-white [&>svg]:!text-white">
                <SelectValue placeholder="Статус заказа"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {statuses.map(status => (
                        <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

