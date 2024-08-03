import { post, get } from "./requester";

const baseUrl = 'http://localhost:3030/data/comments';

const create = async (gameId, text) => post(baseUrl, { gameId, text });

const getAll = async (gameId) => {
    const params = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: 'author=_ownerId:users'
    });
    const url = `${baseUrl}?${params.toString()}`;
    return get(url);
};

export default {
    create,
    getAll
};
