import React, {useEffect, useRef, useState} from "react";

export const useImageUploader = (onFileSelected: (file: File | null) => void, files: File) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (files !== file) {
                onFileSelected(file);
            } else {
                onFileSelected(null);
            }
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        setImagePreview(URL.createObjectURL(files));
    }, [files]);

    return {
        state: { fileInputRef, imagePreview },
        functions: { handleFileChange, handleClick }
    }
}