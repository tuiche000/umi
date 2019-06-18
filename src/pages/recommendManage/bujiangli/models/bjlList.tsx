import * as Service from '../services';
import router from 'umi/router';
import { message } from 'antd';

interface interface_state {
  setUpVisible: boolean,
  EditVisible: boolean,
  selectedRowKeys: any[],
  tableData: any[],
  tableColumns: any[],
  record: any,
  seachData: any,
  pageNo: number,
  totalResults: Number,
  detailData: any // 列表详情数据
}
export default {
  state: {
    seachData: {}, //搜索条件 
    totalResults: Number,
    pageNo: 1, // 分页数据
    setUpVisible: false, //  控制批量设置模态框显示隐藏
    EditVisible: false, //  控制编辑模态框显示隐藏
    selectedRowKeys: [], // 表格选择框选定的数据
    record: {}, //编辑选中的数据
    tableData: [], // 表格数据
    detailData: {}, // 列表详情数据
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
      const result = yield call(Service.reissueList, payload, query);
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
    *detail({ payload }, { call, put }: any) {
      const result = yield call(Service.detail, payload);
      const { data } = result.data
      if (result.data.code === "0") {
        yield put({
          type: 'save',
          payload: {
            detailData: data
          },
        });
      }
    },
    *creat({ payload }, { call, put }: any) {
      const result = yield call(Service.creat, payload);
      const { data } = result.data
      if (result.data.code === "0") {
        // 跳转列表详情页面
        router.goBack()
      }
    },
    *review({ payload , id }, { call, put }: any) {
      const result = yield call(Service.review, payload);
      const { data } = result.data
      if (result.data.code === "0") {
        message.success('审核成功');
        // 更新详情页面
        yield put({
          type: 'detail',
          payload: {
            id,
          },
        });
      }else {
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