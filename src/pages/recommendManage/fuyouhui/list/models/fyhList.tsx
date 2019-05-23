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
    tableData: [
      {
        key: '1',
        Serial: 1,
        ActivityID: 12,
        Recommender: '刘德华',
        RecommendedTime: "2019-01-22 09:09:09",
        ActivityName: "亚特兰蒂斯xxx豪华游",
        ActivitySubtitle: "旅行社",
        Recommendation: "是",
        RecommendedPerson: "郭富城",
        RecommendedWay: "二维码",
        RewardStatus: "已发放",
        AuditStatus: "审核通过",
        orderType: "正常单",
      },
      {
        key: '2',
        Serial: 1,
        ActivityID: 121,
        Recommender: '刘德华',
        RecommendedTime: "2019-01-22 09:09:09",
        ActivityName: "亚特兰蒂斯xxx豪华游",
        ActivitySubtitle: "旅行社",
        Recommendation: "是",
        RecommendedPerson: "郭富城",
        RecommendedWay: "二维码",
        RewardStatus: "已发放",
        AuditStatus: "审核通过",
        orderType: "正常单",
      },
      {
        key: '3',
        Serial: 1,
        ActivityID: 122,
        Recommender: '刘德华',
        RecommendedTime: "2019-01-22 09:09:09",
        ActivityName: "亚特兰蒂斯xxx豪华游",
        ActivitySubtitle: "旅行社",
        Recommendation: "是",
        RecommendedPerson: "郭富城",
        RecommendedWay: "二维码",
        RewardStatus: "已发放",
        AuditStatus: "审核通过",
        orderType: "正常单",
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
    *fetch({ payload: { page = 1 } }, { call, put }: any) {
      const result = yield call(Service.tasklist, {
        pageNo: 1,
        pageSize: 10,
      });
      const { data } = result.data
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          tableData: data.result
        },
      });
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