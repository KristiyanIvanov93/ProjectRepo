import { get } from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
    const result = await get(baseUrl);
    const games = Object.values(result);
    return games;
};
