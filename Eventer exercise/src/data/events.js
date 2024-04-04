import { get, post, put, del } from "./request.js";

const endPoints = {
    dashboard: '/data/events?sortBy=_createdOn%20desc',
    create: '/data/events',
    details: '/data/events/'

};

export async function getAllEvents() {
    return get(endPoints.dashboard);
};

export async function getEventById(id) {
    return get(endPoints.details + id);
};

export async function createEvent(name, imageUrl, category, description, date) {
    return post(endPoints.create, { name, imageUrl, category, description, date });
};

export async function updateEvent(id, data) {
    return put(endPoints.details + id, data);
};

export async function deleteEvent(id) {
    return del(endPoints.details + id);
}