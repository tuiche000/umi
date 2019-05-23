import * as Service from '../services';
// import router from 'umi/router';

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
    tableData: [], // 表格数据
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
    *fetch({ payload: { page = 1 } }, { call, put }: any) {
      const result = yield call(Service.tasklist, {
        pageNo: 1,
        pageSize: 10,
      });
      const { data } = result.data

      data.result.forEach((item:any,index:any) => {
        item.serial = index +1
      }) 
      yield put({
        type: 'save',
        payload: {
          tableData: data.result
        },
      });
      console.log(data)
    },
    
    *edit({ payload }, { call, put }: any) {
      const result = yield call(Service.edit, payload);
      if (result.data.code === "0") {
        yield put({
          type: 'fetch',
          payload: "",
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