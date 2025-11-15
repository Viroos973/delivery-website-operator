import React, {useRef} from "react";

export const useImageUploader = (onFileSelected: (file: File, index: number) => void, index: number) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            onFileSelected(file, index);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return {
        state: { fileInputRef },
        functions: { handleFileChange, handleClick }
    }
}