import request from '@/utils/request';

export function productTasklist(
  query: {
    
  }
) {
  return request.get(`http://unitest.fosunholiday.com/api/mms/spread/backend/accounts/export/prize/issue`,query);
}