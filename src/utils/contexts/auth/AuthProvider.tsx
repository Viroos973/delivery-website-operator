import React, {useEffect, useMemo, useState} from 'react';
import {REFRESH_TOKEN, USER_TOKEN} from "@/utils/constants/token.ts";
import {AuthContext} from "@/utils/contexts/auth/AuthContext.tsx";
import {getDataJWT} from "@/utils/helpers/getDataJWT.ts";
import {getUserToken} from "@/utils/helpers/getUserToken.ts";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = getUserToken();

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const data = getDataJWT(token);

            if (data.exp * 1000 < Date.now()) {
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
        } catch {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token: string, refresh: string) => {
        localStorage.setItem(USER_TOKEN, token);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem('user_tracking_id');
        setIsAuthenticated(false);

        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    };

    const value = useMemo(
        () => {
            const token = getUserToken();
            const data = token ? getDataJWT(token) : { role: [], sub: '' };

            return ({
                authenticated: isAuthenticated,
                roles: data?.role || [],
                userId: data?.sub || '',
                login,
                logout
            })
        },
        [isAuthenticated]
    );

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};