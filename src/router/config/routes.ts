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
        path: 'globeMaterials',
        name: 'globeMaterials',
        title: '全局材质',
        icon: 'Edit',
        component: 'cesium/globeMaterials',
        type: 'link'
      },
      {
        path: 'shader',
        name: 'cesiumShader',
        title: 'shader',
        icon: 'Edit',
        component: 'cesium/shader',
        type: 'menu',
        children: [
          {
            path: 'fire',
            name: 'fire',
            title: 'fire',
            icon: 'Edit',
            component: 'cesium/shader/fire',
            type: 'link'
          }
        ]
      }
    ]
  },
  {
    path: 'threejs',
    name: 'threejs',
    title: 'threejs',
    icon: 'cesium.jpeg',
    type: 'menu',
    component: 'threejs',
    children: [
      {
        path: 'shader',
        name: 'threeShader',
        title: 'shader',
        icon: 'Edit',
        component: 'threejs/shader',
        type: 'menu',
        children: [
          {
            path: 'sea',
            name: 'sea',
            title: 'sea',
            icon: 'Edit',
            component: 'threejs/shader/sea',
            type: 'link'
          }
        ]
      },
      {
        path: 'primitives',
        name: 'primitives',
        title: 'primitives',
        icon: 'Edit',
        component: 'threejs/primitives',
        type: 'link'
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
