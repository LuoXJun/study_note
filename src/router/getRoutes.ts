/**
 * 菜单渲染情况
 * 1、作为菜单组渲染  type==menu
 * 2、作为菜单按钮渲染  type==link
 * 3、作为菜单按钮级别页面的子页面
 *
 * @format
 */

import { RouteRecordRaw, RouterView } from 'vue-router';
import router from '@/router';
import Layout from '@/views/layout.vue';
const views = import.meta.glob('../views/pages/**/*.vue');
const Null = import.meta.glob('../views/Null.vue');

// 解析菜单构建路由表
export const getRoutes = (menus: RouteOptions[]) => {
  const routes: RouteRecordRaw[] = [];
  for (const menu of menus) {
    const obj: RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      redirect: menu.redirect ?? '',
      component:
        menu.type == 'menu'
          ? RouterView
          : views[`../views/pages/${menu.component}/index.vue`] ||
            Null[`../views/Null.vue`],
      meta: {
        icon: menu.icon,
        title: menu.title,
        type: menu.type,
        isHidden: menu.isHidden || false
      },
      children: []
    };

    if (menu.children && menu.children.length > 0) {
      obj.children.push(...getRoutes(menu.children));
    }
    routes.push(obj);
  }
  return routes;
};

// 注册路由
export const setRoute = (routes: RouteRecordRaw[]) => {
  const layout: RouteRecordRaw = {
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: Layout,
    children: []
  };
  routes.forEach((route) => {
    layout.children.push(route);
  });
  router.addRoute(layout);
};
