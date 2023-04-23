<template>
  <div>
    <el-card shadow="always">
      <!-- 路由注册但本地不存在当前文件时 -->
      <div>浏览的文件不存在</div>
      <div>名称：{{ $route.name }}</div>
      <div>路径：src/pages{{ $route.path }}/index.vue</div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>
