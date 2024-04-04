import { get, post, put, del } from "./request.js";


// Change based on the Exam requirements
const endPoints = {
    dashboard: '/data/motorcycles?sortBy=_createdOn%20desc',
    create: '/data/motorcycles',
    details: '/data/motorcycles/'

};

export async function getAllMotors() {
    return get(endPoints.dashboard);
};

export async function getMotorById(id) {
    return get(endPoints.details + id);
};

export async function createMotor(model, imageUrl, year, mileage, contact, about) {
    return post(endPoints.create, { model, imageUrl, year, mileage, contact, about});
};

export async function updateMotor(id, data) {
    return put(endPoints.details + id, data);
};

export async function deleteMotor(id) {
    return del(endPoints.details + id);
}


export async function searchByQuery(query){
    return await get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`)
}