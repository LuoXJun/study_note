<template>
  <!-- 基础形状 -->
  <div>
    <baseScene />
  </div>
</template>

<script setup lang="ts">
import { BufferGeometry } from 'three';
import baseScene from '../AthreeComponents/baseScene.vue';
import { useThree } from '@/store/useThree';
import { initTextures } from './textures';
import { linght } from './light';
import { leaningCamera } from './camera';

const store = useThree();

const createLine = () => {
  const material = new THREE.LineBasicMaterial({ color: 'red' });

  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(100, 100, 0),
    new THREE.Vector3(100, 200, 100),
    new THREE.Vector3(100, 300, 100)
  ];

  const geometry = new BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  store.scene.add(line);
};

const viewFog = () => {
  // 距离相机的位置
  // store.scene.fog = new THREE.Fog('#fff', 500, 1000);

  store.scene.fog = new THREE.FogExp2('#f5ad47', 0.01);
};

onMounted(() => {
  linght();
  viewFog();
  return;
  createLine();
  initTextures();
  leaningCamera();
});
</script>

<style scoped></style>
