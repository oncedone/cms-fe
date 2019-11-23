
import request from '../utils/request';

export function logout() {
  return request({
    url: `/logout`,
    method: 'GET',
  }).catch(e=>e);
}

export function getChoices() {
  return request({
    url: `/api/v1/choices`,
    method: 'GET',
  }).catch(e=>e);
}