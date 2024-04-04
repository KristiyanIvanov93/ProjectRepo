import { get, post, put, del } from "./request.js";


const endPoints = {
    dashboard: '/data/cyberpunk?sortBy=_createdOn%20desc',
    create: '/data/cyberpunk',
    details: '/data/cyberpunk/'

};

export async function getAllItems() {
    return get(endPoints.dashboard);
};

export async function getItemById(id) {
    return get(endPoints.details + id);
};

export async function createItem(item, imageUrl, price, availability, type, description) {
    return post(endPoints.create, { item, imageUrl, price, availability, type, description});
};

export async function updateItem(id, data) {
    return put(endPoints.details + id, data);
};

export async function deleteItem(id) {
    return del(endPoints.details + id);
};


