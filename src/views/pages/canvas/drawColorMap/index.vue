<template>
  <div class="drawColorMap">
    <p>降雨量/mm</p>
    <div>
      <canvas id="colorMapCanvas" width="40"></canvas>
      <div>
        <p v-for="(item, index) in rainColorMap" :key="index">
          {{ item[item.length - 1] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rainColorMap = [
  //雨量色标
  [-99999, 0, [212, 255, 192, 0], '0~1'],
  [-0.99999, 1, [212, 255, 192, 255], '0~1'],
  [1, 2, [166, 240, 145, 255], '1~2'],
  [2, 4, [59, 166, 10, 255], '2~4'],
  [4, 6, [94, 182, 254, 255], '4~6'],
  [6, 8, [0, 2, 245, 255], '6~8'],
  [8, 10, [2, 112, 75, 255], '8~10'],
  [10, 20, [254, 1, 242, 255], '10~20'],
  [20, 50, [218, 79, 12, 255], '20~50'],
  [50, 65535, [120, 1, 0, 255], '>50']
];

onMounted(() => {
  const colorMapCanvas = document.querySelector(
    '#colorMapCanvas'
  ) as HTMLCanvasElement;

  colorMapCanvas.height = rainColorMap.length * 31;

  const ctx = colorMapCanvas.getContext('2d');
  ctx!.strokeStyle = 'rgba(0, 0, 0, 0.5)';

  rainColorMap.forEach((item, index) => {
    item.forEach((el) => {
      if (el instanceof Array) {
        ctx!.fillStyle = `rgba(${el.toLocaleString()})`;
        ctx!.fillRect(10, index * 30, 20, 20);
        ctx!.strokeRect(10, index * 30, 20, 20);
      }
    });
  });
});
</script>

<style scoped>
.drawColorMap {
  background-color: #40183f86;
  width: 120px;
}

.drawColorMap p {
  padding: 0;
  margin: 0;
}
.drawColorMap > p {
  color: #fff;
  padding: 20px 0 20px 10px;
}
.drawColorMap > div {
  display: flex;
}
.drawColorMap > div > div > p {
  height: 20px;
  line-height: 20px;
  padding-bottom: 10px;
  color: #fff;
}
</style>
