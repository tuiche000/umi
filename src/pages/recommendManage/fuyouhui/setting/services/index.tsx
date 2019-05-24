import request from '@/utils/request';

export function tasklist(
  params: {
    pageNo: 1,
    pageSize: 10,
    product: {},
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/product/tasklist`, params);
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
