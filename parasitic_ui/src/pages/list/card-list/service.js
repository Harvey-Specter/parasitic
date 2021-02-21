import request from 'umi-request';
export async function queryFakeList(params) {
  console.info('params====',params)
  return request('/api/fake_list', {
    params,
  });
}
