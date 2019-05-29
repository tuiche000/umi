import * as Service from '../services';
// import router from 'umi/router';
import { message } from 'antd';
import router from "umi/router"

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
  stages: {
    "stage": number,
    "name": string,
    "subTitle": string,
    "description": string,
    "image": string,
    "timesBegin": number,
    "timesEnd": number,
    "prizeScale": string,
    "value": number
  }[],
  pageNo: number,
  seachData: any,
}
export default {
  state: {
    pageNo: 1, // 分页
    seachData: {}, // 搜索数据
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
    tableData: [], // 表格数据
    tableColumns: [],
    stages: [ // 阶段列表
    ]
  },
  reducers: {
    save(state: interface_state, action: {
      type: string,
      payload: {}
    }) {
      return { ...state, ...action.payload }
    },
    del(state: interface_state, action: {
      type: string,
      payload: number
    }) {
      let obj = Object.assign({}, state)
      state.stages.splice(action.payload, 1)
      console.log({ ...obj.stages })
      return state
    },
    clear(state: interface_state, action: {
      type: string,
      payload: string
    }) {
      let obj = Object.assign({}, state)
      state.stages = []
      return state
    },
  },
  effects: {
    *fetch({ payload, query }, { call, put }: any) {
      const result = yield call(Service.tasklist, payload, query);
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

    *edit({ payload, query, fetchPayload }, { call, put }: any) {
      const result = yield call(Service.edit, payload);
      if (result.data.code === "0") {
        if (result.data.code === "0") {
          message.success('添加成功');
          router.goBack()
        }
        // yield put({
        //   type: 'fetch',
        //   payload: fetchPayload,
        //   query: {
        //     pageNo: query,
        //   }
        // });
      }
    },

    *add({ payload }, { call, put }: any) {
      const result = yield call(Service.add, payload);
      console.log(result.data.code)
      if (result.data.code === "0") {
        message.success('修改成功');
        router.goBack()
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