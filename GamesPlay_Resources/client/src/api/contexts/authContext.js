import { createContext } from "react";



export const AuthContext = createContext({
    userId: '',
    email: '',
    acessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});


