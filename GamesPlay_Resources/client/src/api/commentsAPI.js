/* eslint-disable no-unused-vars */
import { post, get } from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/games';
const buildUrl = (gameId) => `${baseUrl}/${gameId}/comments`;

const create = async (gameId, username, text) => post(buildUrl(gameId), { username, text });

const getAll = async (gameId,) => {
    const result = await get(buildUrl(gameId));
    const comments = Object.values(result);
    return comments;
};


export default {
    create,
    getAll
};