import {useContext} from "react";
import {AuthContext} from "@/utils/contexts/auth/AuthContext.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};