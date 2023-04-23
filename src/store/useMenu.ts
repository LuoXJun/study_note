import { defineStore } from 'pinia';

interface UseMenu {
  menu: RouteOptions[];
  query: Record<string, any>;
}

/**
 * 必须初始化，否则使用$patch改变值后，不能监听到值的变化
 * */
const state =
  <UseMenu>JSON.parse(sessionStorage.getItem('state') as string) ||
  <UseMenu>{ menu: {}, query: {} };

export const useMenuStore = defineStore('menu', {
  state: () => {
    return state;
  }
});
