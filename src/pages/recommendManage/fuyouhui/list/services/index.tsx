import request from '@/utils/request';

export function tasklist(
  params: {
    pageNo: 1,
    pageSize: 10,
    product: {},
  }
) {
  return request.get(`http://101.132.27.104:7077/api/mms/spread/backend/recommends/task/list`, params);
}

export function detail(
  params: {
    id: String,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/recommends/${params.id}/member/detail`);
}

