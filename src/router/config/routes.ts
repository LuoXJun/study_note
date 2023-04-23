export const routeConfig: RouteOptions[] = [
  {
    path: '/',
    name: 'index',
    title: '首页',
    component: 'homePage',
    isHidden: true,
    type: 'link'
  },
  {
    path: 'cesium',
    name: 'cesium',
    title: 'cesium',
    icon: 'cesium.jpeg',
    type: 'menu',
    component: 'cesium',
    children: [
      {
        path: 'entity',
        name: 'entity',
        title: 'entity',
        icon: 'Edit',
        component: 'cesium/entity',
        type: 'menu'
      },
      {
        path: 'scene',
        name: 'scene',
        title: 'scene',
        icon: 'Edit',
        component: 'cesium/scene',
        type: 'menu',
        children: [
          {
            path: 'createScene',
            name: 'createScene',
            title: '基础场景',
            icon: 'Edit',
            component: 'cesium/scene/createScene',
            type: 'link'
          }
        ]
      }
    ]
  },
  {
    path: 'auth',
    name: 'auth',
    title: '权限编辑',
    icon: 'User',
    type: 'link',
    component: 'auth'
  }
];
