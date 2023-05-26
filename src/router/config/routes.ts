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
        path: 'lesson1',
        name: 'lesson1',
        title: 'lesson1',
        icon: 'Edit',
        component: 'threejs/lesson1',
        type: 'link'
      }
    ]
  },
  {
    path: 'canvas',
    name: 'canvas',
    title: 'canvas',
    icon: 'User',
    type: 'menu',
    component: 'canvas',
    children: [
      {
        path: 'drawCartographic',
        name: 'drawCartographic',
        title: '弧度扇形',
        icon: 'User',
        type: 'link',
        component: 'canvas/drawCartographic'
      },
      {
        path: 'drawColorMap',
        name: 'drawColorMap',
        title: '色标',
        icon: 'User',
        type: 'link',
        component: 'canvas/drawColorMap'
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
  },
  {
    path: 'node',
    name: 'node',
    title: 'node',
    icon: 'User',
    type: 'menu',
    component: 'node',
    children: [
      {
        path: 'serve',
        name: 'nodeServe',
        title: '本地服务',
        icon: 'User',
        type: 'link',
        component: 'nodeServe'
      }
    ]
  }
];
