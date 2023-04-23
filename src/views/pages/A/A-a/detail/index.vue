<template>
  <div>
    <div @click="goPath">detail（click me reback）</div>
    <div>{{ $route.query }}</div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goPath = () => {
  router.push({
    path: '/A/A-a'
  });
};
</script>

<style scoped></style>
