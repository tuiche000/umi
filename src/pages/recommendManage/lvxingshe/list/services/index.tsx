import request from '@/utils/request';

export function productTasklist(
  params: {
  },
  query: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/recommends/product/list`, params,query);
}

export function examine(
  params: {
    id: string,
    status: string,
    reason: string,
    remark: string,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/recommend-prize/review`, params);
}