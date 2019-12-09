import request from '../utils/request';

export function logout() {
    return request({
        url: `/logout`,
        method: 'GET',
    }).catch(e => e);
}

export function login() {}

export function registry() {}

export function dictionaries(params) {
    return request({
        url: '/api/dictionaries',
        method: 'GET',
    }).catch();
}

export function channels() {
    return request({
        url: '/api/channels',
        method: 'GET',
    }).catch();
}

export function categories() {
    return request({
        url: '/api/categories',
        method: 'GET',
    }).catch();
}

export function cities() {
    return request({
        url: '/api/cities',
        method: 'GET',
    }).catch();
}
