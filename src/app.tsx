import router from 'umi/router';
import { message } from 'antd';

// export const dva = {
//   config: {
//     onError(e: any) {
//       e.preventDefault();
//       console.error(e.message);
//     },
//   },
//   plugins: [
//     require('dva-logger')(),
//   ],
// };

// 路由跳转运行时
export function onRouteChange({ location, routes, action }: any) {
  // console.log(location)
  // console.log(routes)
  // console.log(router)
  // 没登录
  if (!localStorage.getItem('access_token') && location.pathname != '/login') {
    message.warn('未登录或登录已过期')
    router.replace('/login')
  }
}
