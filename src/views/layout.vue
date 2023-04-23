<template>
  <div class="common-layout templateClass">
    <el-container>
      <el-aside width="240px">
        <leftMenu title="标题" />
      </el-aside>
      <el-container>
        <el-header style="height: auto">
          <headerNav></headerNav>
        </el-header>
        <el-main style="background-color: #e4e7ed">
          <el-card shadow="hover">
            <router-view />
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import leftMenu from '@/components/leftMenu.vue';
import headerNav from '@/components/headerNav.vue';
</script>

<style lang="scss">
.templateClass {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
