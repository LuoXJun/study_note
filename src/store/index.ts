import { defineStore } from 'pinia';

export const getMenuStore = defineStore('getMenuStore', {
  state: () => {
    return {
      menus: []
    };
  },
  // 控制修改当前
  actions: {
    editName() {
      this.menus = [];
    }
  },
  getters: {
    // 使用参数时
    getName(state) {
      return state.menus;
    },
    // 不使用参数时需要指定返回值类型,可自定义返回值
    getSex(): any[] {
      return this.menus;
      // return '123'
    }
  }
});
