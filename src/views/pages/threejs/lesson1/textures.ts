import { importImgs } from '@/utils/getAssets';
export const initTextures = () => {
  // 创建纹理加载管理器
  const loaderManager = new THREE.LoadingManager();

  // 创建加载器
  const loader = new THREE.TextureLoader(loaderManager);
  const texture = loader.load(importImgs('notFound.jpeg'));
  loader.load(importImgs('notFound.jpeg'));
  loader.load(importImgs('notFound.jpeg'));
  loader.load(importImgs('notFound.jpeg'));

  //   当加载多个对象时可以通过url判断某个对象是否完成
  loaderManager.onProgress = (url, loaded, total) => {
    console.log(url, loaded, total);
  };
  loaderManager.onLoad = () => {
    console.log('end');
  };

  /**
   * 每个纹理占用的字节数 宽度 * 高度 * 4 * 1.33 字节的内存。
   * magFilter:
   * NearestFilter --在纹理中选择最近的像素
   * LinearFilter --从纹理中选择4个像素，然后混合它们
   * NearestMipmapNearestFilter --选择合适的mip，然后选择一个像素。
   * NearestMipmapLinearFilter --选择2个mips，从每个mips中选择一个像素，混合这2个像素
   * LinearMipmapNearestFilter --选择合适的mip，然后选择4个像素并将它们混合。
   * LinearMipmapLinearFilter --选择2个mips，从每个mips中选择4个像素，然后将所有8个像素混合成1个像素。
   * */
  texture.magFilter = THREE.NearestFilter;

  /**
   * 纹理重复;
   * ClampToEdgeWrapping:每条边上的最后一个像素无限重复。
   * RepeatWrapping:纹理重复
   * MirroredRepeatWrapping:在每次重复时将进行镜像
   * */
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  //   纹理在水平和垂直方向上的重复次数
  texture.repeat.set(4, 4);

  //   偏移为1时表示偏移一个纹理大小的距离
  texture.offset.set(0.5, 0.5);

  //   0.5,0.5表示纹理中心，可以控制旋转中心
  texture.center.set(0.5, 0.5);
};
