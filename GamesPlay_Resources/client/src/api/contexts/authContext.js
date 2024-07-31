import { createContext } from "react";



export const AuthContext = createContext({
    email: '',
    acessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});


