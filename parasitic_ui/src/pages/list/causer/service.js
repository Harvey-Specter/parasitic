//import request from '../../../utils/request';
import request from 'umi-request';

export async function queryCaUser(params) {
  console.info('queryCaUser====',params)
  //params = JSON.parse(params)
  return request('/api/caUser', {
    params,
  });
}
export async function removeUser(params) {
  return request('/api/user', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addCaUser(params) {

  //console.info('addUser====',params)

  return request('/api/caUser', {
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
