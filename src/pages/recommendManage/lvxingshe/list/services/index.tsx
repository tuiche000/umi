import request from '@/utils/request';

export function productTasklist(
  params: {
  },
  query: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommends/product/list`, params,query);
}

export function examine(
  params: {
    id: string,
    status: string,
    reason: string,
    remark: string,
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommend-prize/review`, params);
}
export function detail(
  params: {
    id: string,
  }
) {
  return request.get(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommends/${params.id}/product/detail`);
}