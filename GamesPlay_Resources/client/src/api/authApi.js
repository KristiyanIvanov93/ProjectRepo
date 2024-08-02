import { post } from './requester';

const baseUrl = 'http://localhost:3030/users';

export async function login(email, password) {
    const result = await post(`${baseUrl}/login`, { email, password });
    if (result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
    }
    return result;
}

export const register = (email, password) => post(`${baseUrl}/register`, { email, password });
