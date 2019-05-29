import * as Service from '../services';
// import router from 'umi/router';
import { message } from 'antd';

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  auditFailedVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
  totalResults: number,
  seachData: any,
  pageNo: number,
}
export default {
  state: {
    seachData: {}, // 搜索数据
    pageNo: 1, // 分页数据
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    auditFailedVisible: false, // 控制审核失败模态框
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
    totalResults: Number,
    tableData: [
      {
        id: "5AGIuJOBtY3uy2uf6j470q",
        limitation: "ALL_MEMBER",
        prizeScale: "NUMBER",
        productPrize: "0.00",
        productType: "自由行",
        recommended: false,
      },
    ], // 表格数据
    tableColumns: []
  },
  reducers: {
    save(state: interface_state, action: {
      type: string,
      payload: {}
    }) {
      return { ...state, ...action.payload }
    }
  },
  effects: {
    *fetch({ payload, query }, { call, put }: any) {
      const result = yield call(Service.productTasklist, payload, query);
      const { data } = result.data
      const { totalResults } = data
      if (data.result) {
        data.result.forEach((item: any, index: any) => {
          item.serial = index + 1
        })
      } else {
        data.result = []
      }
      yield put({
        type: 'save',
        payload: {
          tableData: data.result,
          totalResults
        },
      });
    },
    *examine({ payload, query, fetchPayload }, { call, put }: any) {
      const result = yield call(Service.examine, payload);
      if (result.data.code != "0") {
        message.error(result.data.message);
      } else if (result.data.code == "0") {
        yield put({
          type: 'fetch',
          query: {
            pageNo: query,
          },
          payload: fetchPayload,
        });
      }
    },
  },
  subscriptions: {
    // setup({ dispatch, history }: any, done: any) {
    //   return history.listen(({ pathname, query }: any) => {
    //     if (pathname === '/users') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // }
  },
};