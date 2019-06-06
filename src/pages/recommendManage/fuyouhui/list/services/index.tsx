import request from '@/utils/request';

export function tasklist(
  params: {
  },
  query: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommends/task/list`, params,query);
}

export function detail(
  params: {
    id: string
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommends/${params.id}/member/detail`);
}
export function review(
  params: {
    id: string
    status: string,
    reason: string,
    remark: string,
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/recommend-prize/review`, params);
}

