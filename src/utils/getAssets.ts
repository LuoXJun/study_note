/**
 * 正式环境只有动态传入文件名时才能解析
 * 测试环境可以动态传入路径
 */
export const importImg = (imgUrl: string) => {
  return new URL(`../assets/${imgUrl}`, import.meta.url).href;
};

export const importImgs = (imgUrl: string) => {
  return new URL(`../assets/imgs/${imgUrl}`, import.meta.url).href;
};
