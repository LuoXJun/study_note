interface RouteOptions {
  path: string;
  /**路径默认为  views/pages/**\/index.vue  */
  component: string;
  title: string;
  /**link：菜单按钮，menu:菜单组,other:详情页*/
  type: 'link' | 'menu' | 'other';
  /**element图标库图标，区分大小写*/
  icon?: string;
  // 是否隐藏菜单
  isHidden?: boolean;
  name?: string;
  redirect?: string;
  children?: RouteOptions[];
}
