<template>
  <div class="notFound" @click="$router.push('/')"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.notFound {
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-image: url('@/assets/imgs/notFound.jpeg');
  background-size: cover;
}
</style>
