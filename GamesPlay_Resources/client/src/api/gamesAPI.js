import { get, post } from "./requester";

const baseUrl = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const result = await get(baseUrl);
    const games = Object.values(result);
    return games;
};


export const getOne = async (gameId) => {
    const result = await get(`${baseUrl}/${gameId}`);
    return result;
};

export const create =  (gameData) => post(`${baseUrl}`, gameData);

