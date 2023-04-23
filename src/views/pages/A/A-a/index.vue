<template>
  <div>
    <div>
      <el-button @click="goPath()">A-a</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const goPath = () => {
  router
    .push({
      path: '/A/A-a/detail',
      query: {
        data: [1, 2, '罗君'],
        name: '123',
        type: ['asdf', 13213, '刘建军']
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style scoped></style>
