import {useEffect, useState} from "react";
import {useAuth} from "@/utils/contexts/auth";

export const useHeader = () => {
    const { authenticated, roles, logout } = useAuth()
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const generateBasketId = (): string => {
        return crypto.randomUUID();
    };

    useEffect(() => {
        let existingBasketId = localStorage.getItem('basketId');

        if (!existingBasketId) {
            existingBasketId = generateBasketId();
            localStorage.setItem('basketId', existingBasketId);
        }
    }, []);

    return {
        state: { isOpenLogin, authenticated, roles, isMenuOpen },
        functions: { setIsOpenLogin, logout, setIsMenuOpen }
    }
}