import { useThree } from '@/store/useThree';
import { createPlane } from '@/hooks/usePlane';
const store = useThree();

// 创建一个新的视窗展示相机
const camera = shallowRef();
const createNewWindow = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.position = 'absolute';
  canvas.style.bottom = '10px';
  canvas.style.right = '10px';
  document.querySelector('.baseScene')!.appendChild(canvas);

  camera.value = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.value.lookAt(store.camera.position);
  store.scene.add(camera.value);
};

const render = () => {
  store.renderer.setScissor(0, 0, 400, 400);
  store.renderer.setViewport(0, 0, 400, 400);
  store.renderer.setScissorTest(true);

  {
    store.renderer.setScissor(0, 0, 800, 400);
    store.renderer.setViewport(0, 0, 800, 400);
    store.renderer.setScissorTest(true);

    store.renderer.render(store.scene, camera.value);
  }

  requestAnimationFrame(render);
};

export const leaningCamera = () => {
  return;
  const ambientLight = new THREE.AmbientLight('#fff');
  store.scene.add(ambientLight);
  createPlane();
  createNewWindow();
  render();
};
