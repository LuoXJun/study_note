<template>
  <div>
    <div>
      <IEpEdit />
    </div>
    <div>A-b</div>
    <!-- 静态资源动态引入 -->
    <baseImgVue img-url="notFound.jpeg" />
    <!-- 直接引入 -->
    <img src="@/assets/imgs/notFound.jpeg" alt="" />
  </div>
</template>

<script setup lang="ts">
import baseImgVue from '@/components/base-img/base-img.vue';
</script>

<style scoped></style>
