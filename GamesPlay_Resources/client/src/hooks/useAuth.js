import { useContext } from "react";
import { login, register } from "../api/authApi";
import { AuthContext } from "../api/contexts/authContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        try {
            const result = await login(email, password);
            changeAuthState(result);
            return result;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password) => {
        try {
            const result = await register(email, password);
            changeAuthState(result);
            return result;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };
    
    return registerHandler;
};
