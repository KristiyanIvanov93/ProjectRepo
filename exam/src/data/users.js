import { get, post } from "./request.js";
import { clearUserData, setUserData } from "./util.js";


const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',

};
export async function login(email, password) {
    const result = await post(endPoints.login, { email, password });
    setUserData(result);
};

export async function register(email, password) {
    const result = await post(endPoints.register, { email, password });
    setUserData(result);

};

export async function logout() {
    const promise = get(endPoints.logout);
    clearUserData();
    await promise;
};