import request from '@/utils/request';

export function reissueList(
  params: {
  },
  query: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/reissue/list`, params, query);
}

export function detail(
  params: {
    id: string
  }
) {
  return request.get(`http://unitest.fosunholiday.com/api/mms/spread/backend/reissue/${params.id}/detail`);
}

export function creat(
  params: {
  },
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/reissue/creat`, params);
}

export function review(
  params: {
  },
) {
  return request.post(`http://unitest.fosunholiday.com/api/mms/spread/backend/reissue/review`, params);
}
