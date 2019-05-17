import router from 'umi/router';

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
    console.log(router)
    router.replace('/login')
  }
}
