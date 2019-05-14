export default {
  // namespace 用来标识reducer文件，connect的时候使用
  // 类似redux整合所有reducer文件中的key值
  // namespace: "g",
  // 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    //相当于redux的InitialState
    collapsed: false,
  },
  // Action 处理器，处理同步动作，用来算出最新的 State
  reducers: {
    sync_changeCollapsed(state: {
      collapsed: boolean
    }, action: {
      type: string,
      payload: {
        collapsed: boolean
      }
    }) {
      return { ...state, collapsed: action.payload };
    },
  },
  //可以在这里进行监听
  subscriptions: {
  },
  // Action 处理器，处理异步动作
  effects: {
    *async_cchangeCollapsed(action: {
      type: string,
      payload: {
        collapsed: boolean
      }
    }, { put, call }: any) {
      // 执行异步函数
      // yield call(delay, 1000);
      // 发出一个 Action，类似于 dispatch
      yield put({ type: 'changeCollapsed', payload: {} })
    }
  }
}