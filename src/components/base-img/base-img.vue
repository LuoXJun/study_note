<template>
  <div>
    <img :src="importImgs(imgUrl)" alt="" style="width: 100px; height: 100px" />
  </div>
</template>

<script setup lang="ts">
import { importImgs } from '@/utils/getAssets';
defineProps({
  imgUrl: {
    type: String,
    default: ''
  }
});
</script>

<style scoped></style>
