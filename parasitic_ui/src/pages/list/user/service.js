//import request from '../../../utils/request';
import request from 'umi-request';

export async function queryUser(params) {
  console.info('queryUser====',params)
  //params = JSON.parse(params)
  return request('/api/user', {
    params,
  });
}
export async function removeUser(params) {
  return request('/api/user', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addUser(params) {

  //console.info('addUser====',params)

  return request('/api/user', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateUser(params) {
  return request('/api/user', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function cancelUser(params) {
  return request('/api/user', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
