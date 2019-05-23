import request from '@/utils/request';

export function productlist(
  params: {
    pageNo: 1,
    pageSize: 10,
    product: {},
  }
) {
  return request.get(`http://unitest.fosunholiday.com/api/mms/spread/backend/product/productlist`, params);
}

export function edit(
  params: {
    id: string,
    productId: string,
    productName: string,
    productSubTittle: string,
    productType: string,
    ruleType: string,
    prizeScale: string,
    manager: string,
    recommended: string,
    limitation: string,
    displayOrder: string,
    productPrize: string,
    enabled: boolean,
  }
) {
  return request.post(`http://101.132.27.104:7077/api/mms/spread/backend/product/update/product`, params);
}

