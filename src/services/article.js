import request from '../utils/request';

export function query(params) {
    return request({
        url: '/api/articles/query',
        method: 'GET',
        params
    }).catch(e => e);
}

export function detail(id) {
    return request({
        url: `/api/articles/${id}`,
        method: 'get',
    });
}

// 创建 、 更新（data中需要itemId）
export function update(data) {
    return request({
        url: `/api/articles`,
        method: 'POST',
        data,
    });
}

export function del(id) {
    return request({
        url: `/api/articles/${id}/delete`,
        method: 'DELETE',
    });
}

export function online(id) {
    return request({
        url: `/api/articles/${id}/online`,
        method: 'PATCH',
    });
}

export function offline(id) {
    return request({
        url: `/api/articles/${id}/offline`,
        method: 'PATCH',
    });
}
