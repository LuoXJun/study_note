import { useThree } from '@/store/useThree';
import { importImgs } from '@/utils/getAssets';
// import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
const store = useThree();
export const linght = () => {
  createGeometry();
  createLight();
};

// 创建物体
const createGeometry = () => {
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const phongMaterial = new THREE.MeshPhongMaterial({ color: '#fff' });
  const standardMaterial = new THREE.MeshStandardMaterial({ color: '#fff' });
  const phongCube = new THREE.Mesh(geometry, phongMaterial);
  const standarCube = new THREE.Mesh(geometry, standardMaterial);
  phongCube.position.setY(50);
  standarCube.position.set(150, 50, 0);
  store.scene.add(phongCube, standarCube);

  // 创建地面
  const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
  const loader = new THREE.TextureLoader();
  const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({
      map: loader.load(importImgs('notFound.jpeg'))
    })
  );

  plane.rotateX(-Math.PI / 2);
  store.scene.add(plane);
};

const createLight = () => {
  // 环境光
  // const ambientLight = new THREE.AmbientLight('#fff');
  // store.scene.add(ambientLight);
  // 半球光
  // const hemisphereLight = new THREE.HemisphereLight('#fff', '#000', 1);
  // store.scene.add(hemisphereLight);
  // 方向光--光源位置到目标方向发射一道光
  // const directionalLight = new THREE.DirectionalLight('#fff', 1);
  // directionalLight.position.set(0, 500, 200);
  // directionalLight.target.position.set(0, 0, 0);
  // const directionalLightHelper = new THREE.DirectionalLightHelper(
  //   directionalLight
  // );
  // store.scene.add(directionalLight, directionalLightHelper);
  // 点光源
  const pointLight = new THREE.PointLight('#fff');
  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  // distance 表示光源可以照射到的范围，由强变弱， 为0时表示无限远，强度不再变化
  // pointLight.distance = 1000;
  pointLight.position.set(0, 400, 0);
  store.scene.add(pointLight, pointLightHelper);
  // 聚光灯
  // const spotLight = new THREE.SpotLight('#fff');
  // spotLight.position.set(0, 300, 0);
  // spotLight.target.position.set(0, 0, 0);
  // spotLight.angle = THREE.MathUtils.degToRad(40);
  // // 聚光灯边缘模糊1为最模糊
  // spotLight.penumbra = 1;
  // spotLight.distance = 500;
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // store.scene.add(spotLight, spotLightHelper);

  /**
   * 矩形区域光 光源和辅助器都需要外部引入
   * RectAreaLight 只能影响 MeshStandardMaterial 和 MeshPhysicalMaterial
   * 如果忘了引入和使用 RectAreaLightUniformsLib，光照还是可以显示，但是会看起来很奇怪
   * */
  // RectAreaLightUniformsLib.init();

  // const rectAreaLight = new THREE.RectAreaLight('#fff', 10, 50, 50);
  // rectAreaLight.position.set(150, 200, 200);
  // rectAreaLight.rotation.x = THREE.MathUtils.degToRad(-45);

  // const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  // rectAreaLight.add(rectAreaLightHelper);

  // store.scene.add(rectAreaLight);

  /**
   *  physicallyCorrectLights:这个设置会影响（随着离光源的距离增加）光照如何减弱。这个设置会影响点光源（PointLight）和聚光灯（SpotLight），矩形区域光（RectAreaLight）会自动应用这个特性
   * 在设置光照时，基本思路是不要设置 distance 来表现光照的衰减，也不要设置 intensity。
   * 而是设置光照的 power 属性，以流明为单位，three.js 会进行物理计算，从而表现出接近真实的光照效果。
   * 在这种情况下 three.js 参与计算的长度单位是米，一个 60瓦 的灯泡大概是 800 流明强度。并且光源有一个 decay 属性，为了模拟真实效果，应该被设置为 2。
   * */

  // physicallyCorrectLights 在新版本被useLegacyLights替代
  store.renderer.useLegacyLights = true;
  pointLight.power = 10;
  pointLight.decay = 2;
  pointLight.distance = Infinity;
};
