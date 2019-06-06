import request from '@/utils/request';

export function productlist(
  params: {
    pageNo: 1,
    pageSize: 10,
  }
) {
  return request.get(`http://unitest.fosunholiday.com/api/mms/spread/backend/product/productlist`, params);
}