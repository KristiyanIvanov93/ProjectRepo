import { useContext } from "react";
import { login, logout as apiLogout, register } from "../api/authApi";
import { AuthContext, useAuthContext } from "../api/contexts/authContext";


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


export const useLogout = () => {
    const { logout: localLogout } = useAuthContext();

    const logoutHandler = async () => {
        try {
            await apiLogout(); // Ensure this API call is correct
        } catch (error) {
            console.error('Error during logout:', error.message);
        } finally {
            localLogout(); // Ensure local state is updated after API call
        }
    };

    return logoutHandler;
};