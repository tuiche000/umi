import * as Service from '../services';
// import router from 'umi/router';
import { message } from 'antd';

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
}
export default {
  state: {
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
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
    *fetch({ payload }, { call, put }: any) {
      const result = yield call(Service.productTasklist,payload );
      const { data } = result.data
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
          tableData: data.result
        },
      });
    },

    *examine({ payload }, { call, put }: any) {
      const result = yield call(Service.examine, payload);
      if (result.data.code != "0") {
        message.error(result.data.message);
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