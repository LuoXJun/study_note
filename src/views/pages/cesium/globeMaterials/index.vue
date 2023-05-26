<template>
  <div>
    <!-- 等高线 -->
    <BaseScene />
  </div>
</template>

<script setup lang="ts">
import BaseScene from '@/views/pages/cesium/Acomponents/baseScene.vue';
import { useCesium } from '@/store/useCesium';

const cesiumStore = useCesium();

const lineUniforms = {
  color: Cesium.Color.fromCssColorString('#000'),
  spacing: 1000,
  width: 1
};

const rampUniforms = {
  image: '/src/assets/colorMap/colorMap.png',
  minimumHeight: 0,
  maximumHeight: 1000
};

const elevationContour = () => {
  const elevationContour = new Cesium.Material({
    fabric: {
      type: 'ElevationContour',
      uniforms: lineUniforms
    }
  });
  return elevationContour;
};
const ElevationRamp = () => {
  const ElevationRamp = new Cesium.Material({
    fabric: {
      type: 'ElevationRamp',
      uniforms: rampUniforms
    }
  });
  return ElevationRamp;
};

const both = () => {
  const both = new Cesium.Material({
    fabric: {
      materials: {
        line: {
          type: 'ElevationContour',
          uniforms: lineUniforms
        },
        ramp: {
          type: 'ElevationRamp',
          uniforms: rampUniforms
        }
      },

      components: {
        diffuse: 'line.alpha == 0.0 ? ramp.diffuse : line.diffuse',
        alpha: 'max(line.alpha, ramp.alpha)'
      }
    },

    translucent: false
  });

  return both;
};

onMounted(() => {
  cesiumStore.viewer.scene.globe.material = elevationContour();
  cesiumStore.viewer.scene.globe.material = ElevationRamp();
  cesiumStore.viewer.scene.globe.material = both();
});
</script>

<style scoped></style>
