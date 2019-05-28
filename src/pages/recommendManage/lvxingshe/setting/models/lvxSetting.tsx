import * as Service from '../services';
import { number } from 'prop-types';
// import router from 'umi/router';

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
  totalResults: number,
  pageNo: number,
  seachData: any,
}
export default {
  state: {
    seachData: {}, // 获取搜索数据
    pageNo: 1,  // 分页
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
    tableData: [], // 表格数据
    tableColumns: [],
    totalResults: Number,
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
      const result = yield call(Service.productlist, payload, query);
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
          totalResults,
        },
      });
    },

    *edit({ payload }, { call, put }: any) {
      const result = yield call(Service.edit, payload);
      if (result.data.code === "0") {
        yield put({
          type: 'fetch',
          query: {

          },
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
