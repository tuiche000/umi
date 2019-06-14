import * as Service from '../services';
// import router from 'umi/router';
import { message } from 'antd';

interface interface_state {
  
}
export default {
  state: {
    
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
    *fetch({  query }, { call, put }: any) {
      const result = yield call(Service.productTasklist, query);
      const { data } = result.data
      
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