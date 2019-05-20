import request from '@/utils/request';

export function productTasklist(
  params: {
    pageNo: 1,
    pageSize: 10,
    product: {},
  }
) {
  return request.get(`http://101.132.27.104:7077/api/mms/spread/backend/product/tasklist`, params);
}