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

export function add(
  params: {
    activityName?: string,
    activitySubtitle?: string,
    activityDescription?: string,
    beginTime?: Date,
    endTime?: Date,
    ruleType?: string, //SINGLE 单次 ACCUMULATIVE 累积
    limitation?: string //ALL_MEMBER 全部用户 EXCLUDE_EMPLOYEE 不包含复星员工 ONLY_EMPLOYEE 仅复星员工
    stages?: string
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/product/task/creat`, params);
}
