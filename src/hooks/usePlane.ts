import { useThree } from '@/store/useThree';
import { importImgs } from '@/utils/getAssets';
const store = useThree();

export const createPlane = () => {
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
