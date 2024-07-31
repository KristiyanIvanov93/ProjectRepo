import { useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../api/contexts/authContext";

export const useLogin = () => {

    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const result = await login(email, password);
        changeAuthState(result);
        console.log(result);

    };


    return loginHandler;
};