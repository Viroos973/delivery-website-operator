import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {NO_NORMALIZATION_PHONE} from "@/utils/constants/envBugs.ts";

interface PhoneInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
}

export const PhoneInput = ({ value = '', onChange, onBlur, placeholder = "88005553535" }: PhoneInputProps) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        const numbers = value.replace(/\D/g, '');

        if (numbers.length === 0) {
            setDisplayValue('');
        } else if (numbers.length <= 1) {
            setDisplayValue(numbers);
        } else if (numbers.length <= 4) {
            setDisplayValue(`8 (${numbers.slice(1, 4)}`);
        } else if (numbers.length <= 7) {
            setDisplayValue(`8 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`);
        } else if (numbers.length <= 9) {
            setDisplayValue(`8 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`);
        } else {
            setDisplayValue(`8 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (NO_NORMALIZATION_PHONE) {
            onChange?.(input);
            return
        }

        const numbers = input.replace(/\D/g, '');

        let cleanNumber = numbers;
        if (numbers.length > 0 && numbers[0] !== '8') {
            cleanNumber = '8' + numbers;
        }

        const finalNumber = cleanNumber.slice(0, 11);
        onChange?.(finalNumber);
    };

    return (
        <Input
            value={NO_NORMALIZATION_PHONE ? value : displayValue}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type="tel"
        />
    );
};