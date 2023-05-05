<template>
  <div>
    <BaseScene ref="baseScene" />
  </div>
</template>

<script setup lang="ts">
import BaseScene from '../../Acomponents/baseScene.vue';
import { source } from '../config/fire';
import colorMap from '@/assets/colorMap/colorMap.png';

const baseScene = shallowRef();
const viewer = shallowRef<Cesium.Viewer>();

const createPlane = () => {
  const a = Cesium.Cartographic.fromDegrees(103.36, 29.13);
  const b = Cesium.Cartographic.fromDegrees(109.35, 24.37);

  const planeInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
      rectangle: new Cesium.Rectangle(
        a.longitude,
        b.latitude,
        b.longitude,
        a.latitude
      )
    }),
    id: 'test'
  });

  const c = new Cesium.Primitive({
    geometryInstances: planeInstance,
    appearance: new Cesium.MaterialAppearance({
      material: new Cesium.Material({
        fabric: {
          //   type: 'Color',
          uniforms: {
            // color: Cesium.Color.RED
            // iTime: 1,
            iMouse: new Cesium.Cartesian2(),
            iResolution: new Cesium.Cartesian2(100, 100),
            iChannel0: colorMap,
            iChannel2: colorMap
          },
          source
        }
      }),
      faceForward: true
    })
  });

  viewer.value!.scene.primitives.add(c);
};

onMounted(() => {
  viewer.value = baseScene.value.viewer;

  createPlane();
});
</script>

<style scoped></style>
