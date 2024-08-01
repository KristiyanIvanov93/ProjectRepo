import { post } from './requester';

const baseUrl = 'http://localhost:3030/users';


export const login = async (email, password) => post(`${baseUrl}/login`, { email, password });

export const register = (email, password) => post(`${baseUrl}/register`, { email, password });



