import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import {ROUTES} from "@/utils/constants/routes.ts";

type RoleRouteProps = {
    role: string;
};

export const RoleRoute = ({ role }: RoleRouteProps) => {
    const { authenticated, roles } = useAuth();

    const allowed = authenticated && roles.includes(role);

    if (!allowed) {
        return <Navigate to={ROUTES.ROOT} replace />;
    }

    return <Outlet />;
};