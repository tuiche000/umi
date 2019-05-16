import * as usersService from '../services';
import router from 'umi/router';

interface interface_state {
  access_token: {}
}
export default {
  state: {
    access_token: {}
  },
  reducers: {
    save(state: interface_state, action: {
      type: string,
      payload: {
        access_token: string
      }
    }) {
      localStorage.setItem('access_token', action.payload.access_token)
      return { ...state, access_token: action.payload.access_token }
    }
  },
  effects: {
    *asyncLogin(astion: { payload: { id: string, values: object } }, { call, put, select }: any) {
      let { data } = yield call(usersService.login, astion.payload.id);
      // const access_token = yield select((state: interface_state) => state.access_token);
      yield put({ type: 'save', payload: { access_token: data.access_token } });
    }
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