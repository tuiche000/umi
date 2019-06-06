export default {
  routes: [
    { path: '/', component: 'index', name: '首页', icon: 'home' },
    // { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
    // {
    //   path: '/users', component: './users/_layout',
    //   routes: [
    //     { path: '/users/detail', component: './users/detail' },
    //     { path: '/users/:id', component: './users/id' }
    //   ]
    // },
    {
      path: '/recommendManage',
      name: '推荐管理',
      icon: 'share-alt',
      routes: [
        {
          path: '/recommendManage/lvxingshe',
          name: '旅行社',
          routes: [
            { path: '/recommendManage/lvxingshe/setting', component: './recommendManage/setting', name: '推荐设置' },
            { path: '/recommendManage/lvxingshe/list', component: './recommendManage/list', name: '推荐列表' },
            { path: '/recommendManage/lvxingshe/dataOutput', component: './recommendManage/dataOutput', name: '数据导出' },
          ]
        },
        {
          path: '/recommendManage/fuyouhui',
          name: '复游会',
          routes: [
            { path: '/recommendManage/fuyouhui/setting', component: './fuyouhui/setting', name: '推荐设置' },
            { path: '/recommendManage/fuyouhui/list', component: './fuyouhui/list', name: '推荐列表' },
          ]
        },
        {
          path: '/recommendManage/bujiangli',
          name: '补发奖励管理'
        },
      ]
    }
  ],
};