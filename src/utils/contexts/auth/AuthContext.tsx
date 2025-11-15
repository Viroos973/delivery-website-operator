import React from 'react';

export const AuthContext = React.createContext({
    authenticated: false,
    roles: [] as string[],
    userId: '',
    login: (token: string, refresh: string) => { console.log(token, refresh) },
    logout: () => {},
});