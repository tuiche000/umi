import * as Service from '../services';
// import router from 'umi/router';

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
  stages: {
    "startTime": string,
    "endTime": string,
    "name"?: string,
    "subtitle"?: string,
    "description"?: string
  }[],
}
export default {
  state: {
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
    tableData: [], // 表格数据
    tableColumns: [],
    stages: [ // 阶段列表
      {
        "startTime": '2018-04-24 18:00:00',
        "endTime": '2018-04-24 18:00:00',
        "name": '活动名称',
        "subtitle": '活动副标题',
        "description": '活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明'
      },
      {
        "startTime": '2018-04-24 18:00:00',
        "endTime": '2018-04-24 18:00:00',
        "name": '活动名称2',
        "subtitle": '活动副标题2',
        "description": '活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明活动说明2'
      },
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
      console.log({...obj.stages})
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