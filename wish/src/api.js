import request from './request.js';

export function submit(data) {
    return request({
        url: '/submit',
        method: 'post',
        data
    })
}

export function getWishList(data) {
    return request({
        url: '/submit/getWishList',
        method: 'get'
    })
}

