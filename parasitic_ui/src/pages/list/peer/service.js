import request from 'umi-request';
export async function queryFakeList(params) {
  console.info('params===cc22=',params)
  return request('/api/ca', {
    params,
  });
}

export async function queryIdenList(params) {
  console.info('svc===params===queryIdenListByCaId=',params)
  return request('/api/caUser?ca_id='+params.ca_id, {
    //params,
  });
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/ca', {
    method: 'POST',
    params: {
      count,
    },
    data: restParams
    //data: { ...restParams, method: 'post' },
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
}
