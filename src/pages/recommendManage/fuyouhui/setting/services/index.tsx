import request from '@/utils/request';

export function tasklist(
  params: {
  },
  query: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/product/tasklist`, params, query);
}

export function edit(
  params: {
    id: string,
    activityId: string,
    activityName: string,
    beginDate: string,
    endDate: string,
    ruleType: string,
    limitation: string,
    enabled: string,
    stages: any,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/product/update/task`, params);
}
