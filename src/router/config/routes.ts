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
    path: 'A',
    name: 'A',
    title: 'A',
    icon: 'Edit',
    type: 'menu',
    component: 'A',
    children: [
      {
        path: 'A-a',
        name: 'A-a',
        title: 'A-a',
        icon: 'Edit',
        component: 'A/A-a',
        type: 'link',
        children: [
          {
            path: 'detail',
            name: 'detail',
            title: 'detail',
            icon: 'Edit',
            type: 'other',
            component: 'A/A-a/detail'
          }
        ]
      },
      {
        path: 'A-b',
        name: 'A-b',
        title: 'A-b',
        icon: 'Edit',
        type: 'link',
        component: 'A/A-b'
      }
    ]
  },
  {
    path: 'B',
    name: 'B',
    title: 'B',
    icon: 'logo.png',
    type: 'menu',
    component: 'B',
    children: [
      {
        path: 'B1',
        name: 'B1',
        title: 'B1',
        icon: 'Edit',
        component: 'B/B1',
        type: 'menu',
        children: [
          {
            path: 'B11',
            name: 'B11',
            title: 'B11',
            icon: 'Edit',
            type: 'link',
            component: 'B/B1/B1'
          }
        ]
      }
    ]
  },
  {
    path: 'C',
    name: 'C',
    title: 'C',
    icon: 'Edit',
    type: 'link',
    component: 'C'
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
