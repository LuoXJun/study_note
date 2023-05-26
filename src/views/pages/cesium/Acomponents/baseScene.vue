<template>
  <div ref="sceneContainer"></div>
</template>

<script setup lang="ts">
import { useCesium } from '@/store/useCesium';
const sceneContainer = ref<HTMLDivElement>();
const viewer = ref<Cesium.Viewer>();

const cesiumStore = useCesium();

const setGYpolyLine = async (viewer: Cesium.Viewer) => {
  const maskGeojson = await Cesium.Resource.fetchJson({
    url: 'src/assets/city-demo/贵阳市界.geojson'
  });

  const lineCoordinates: [number, number][] =
    maskGeojson.features[0].geometry.coordinates[0];

  const pointArr = lineCoordinates.map((item) => {
    return Cesium.Cartesian3.fromDegrees(item[0], item[1]);
  });

  viewer.entities.add({
    name: 'gyLineCoordinates',
    polyline: {
      positions: pointArr,
      width: 3,
      clampToGround: true,
      material: Cesium.Color.BLUE
    },
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(pointArr, []),
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.fromCssColorString('#f5ad4f').withAlpha(0.6)
      )
    }
  });
};

onMounted(async () => {
  viewer.value = new Cesium.Viewer(sceneContainer.value!, {
    // 界面UI功能隐藏设置，方法一通过JS控制，方法二通过CSS控制
    // 查找位置工具
    geocoder: false,
    // 视角返回初始位置
    homeButton: true,
    // 选择视角模式，包括3D，2D，哥伦布视图（CV）
    sceneModePicker: false,
    // 图层选择器，选择要显示的地图服务和地形服务
    baseLayerPicker: false,
    // creditContainer 版权信息
    // 导航帮助按钮，显示默认的地图控制帮助
    navigationHelpButton: false,
    // 左下角动画插件隐藏
    animation: false,
    // 时间线，指示当前时间，并允许用户跳到特定时间
    timeline: false,
    // 全屏按钮
    fullscreenButton: true,
    // vr按钮
    vrButton: false,
    // 自定义地形
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: 'src/assets/terrain',
      requestVertexNormals: true //坡度计算需要
    })
  });
  // 帧率
  viewer.value.scene.debugShowFramesPerSecond = false;

  await setGYpolyLine(viewer.value);

  viewer.value.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(103.36, 29.13, 109.35, 24.37)
  });

  cesiumStore.viewer = viewer.value;
});
</script>

<style>
/* 隐藏版权信息图片 */
.cesium-viewer-bottom {
  display: none;
}
</style>
