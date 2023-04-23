import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouterView
} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useMenuStore } from '@/store/useMenu';
import { getRoutes, setRoute } from './getRoutes';
import { stringifyQuery, parseQuery } from './encodeQuery';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/notFound.vue')
  },
  {
    path: '/404',
    name: '404notFound',
    meta: {
      title: '404'
    },
    component: () => import('@/views/notFound.vue')
  },
  {
    path: '/',
    name: 'layout',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/layout.vue'),
    children: []
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
  // query传参加密
  stringifyQuery,
  parseQuery
});

// 消除父子路由同级
const setRouteView = (to: RouteLocationNormalized) => {
  if (to.matched[0].name == 'layout') {
    to.matched.forEach((item, index) => {
      if (index != 0 && index != to.matched.length - 1) {
        if (item.components && item.components.default) {
          item.components.default = RouterView;
        }
      }
    });
  }
};

const isReloadRoute = () => {
  const layout = router.getRoutes().filter((item) => {
    return item.name == 'layout';
  })[0];

  if (layout.children.length === 0) return true;
  return false;
};

router.beforeEach((to, _, next) => {
  const store = useMenuStore();
  const token = sessionStorage.getItem('token');
  store.$patch((state) => {
    state.query = to.query;
  });

  if (!token) return to.path !== '/login' ? next('/login') : next();

  setRouteView(to);

  if (to.path === '/login') {
    sessionStorage.removeItem('token');
    return next();
  }
  if (!store.menu || store.menu.length === 0) return next('/login');

  if (!isReloadRoute()) return next();

  setRoute(getRoutes(store.menu));

  next({
    path: to.path,
    query: {
      ...store.query
    }
  });
});

export default router;
