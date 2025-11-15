import { useGetProfile } from "@/utils/api/hooks/useGetProfile";
import { useState } from "react";

export const useProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userProfile = useGetProfile()

    return {
        state: {isOpen, userProfile},
        functions: { setIsOpen }
    }
}