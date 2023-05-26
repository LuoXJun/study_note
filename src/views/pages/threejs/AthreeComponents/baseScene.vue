<template>
  <div ref="baseScene" class="baseScene"></div>
</template>

<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@/store/useThree';
const store = useThree();
const baseScene = shallowRef<HTMLDivElement>();

const scene = shallowRef(new THREE.Scene());
// 抗锯齿
const renderer = shallowRef(new THREE.WebGLRenderer({ antialias: true }));
const camera = shallowRef(new THREE.PerspectiveCamera());
const controls = shallowRef<OrbitControls>();

const init = () => {
  const width = baseScene.value?.clientWidth as number;
  const height = baseScene.value?.clientHeight as number;

  renderer.value.setSize(width, height);
  renderer.value.setClearColor('#000');
  baseScene.value?.appendChild(renderer.value.domElement);

  // 定义相机
  camera.value = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.value.position.set(0, 500, 500);
  const cameraHelper = new THREE.CameraHelper(camera.value);
  camera.value.lookAt(new THREE.Vector3());
  scene.value.add(camera.value, cameraHelper);

  // 引入坐标系辅助线
  const axis = new THREE.AxesHelper(1000);
  scene.value.add(axis);

  controls.value = new OrbitControls(camera.value, renderer.value.domElement);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight('#fff', 0.3);
  scene.value.add(ambientLight);

  store.scene = scene.value;
  store.renderer = renderer.value;
};

const resize = () => {
  const width = baseScene.value?.clientWidth as number;
  const height = baseScene.value?.clientHeight as number;

  // @ts-ignore
  camera.value.aspect = width / height;
  // @ts-ignore
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(width, height);
};

function animate() {
  requestAnimationFrame(animate);
  renderer.value.render(scene.value, camera.value);
}

onMounted(() => {
  init();
  window.addEventListener('resize', resize);
  controls.value!.update();

  animate();
});
</script>

<style scoped>
.baseScene {
  width: 100%;
  min-height: 900px;
  position: relative;
}
</style>
