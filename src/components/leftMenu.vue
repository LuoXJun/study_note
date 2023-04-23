<!-- 在当前组件递归渲染数据 -->
<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    mode="vertical"
    router
    :collapse="isCollapse"
    unique-opened
    background-color="rgba(8, 90, 148, 1)"
    active-text-color="#000"
    text-color="#fff"
  >
    <template v-if="title">
      <p class="menu-title" @click="$router.push('/')">{{ title }}</p>
    </template>
    <leftMenuComponent :list="renderList" :parent-path="parentPath" />
  </el-menu>
</template>

<script setup lang="ts">
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import { RouteRecordRaw } from 'vue-router';
import { getRoutes, setRoute } from '@/router/getRoutes';
import { useMenuStore } from '@/store/useMenu';

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
});

const store = useMenuStore();

const renderList = ref<RouteRecordRaw[]>([]);
const parentPath = '/';

watch(
  store,
  () => {
    renderList.value = getRoutes(store.menu);
    // menu更新后视图和路由不同步，需注册新添加的路由
    setRoute(getRoutes(store.menu));
  },
  { immediate: true }
);
</script>

<style lang="scss">
.el-menu {
  min-height: 100%;
  .menu-title {
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding: 20px 0;
    font-weight: bold;
    box-sizing: border-box;
    cursor: pointer;
  }
  .el-menu-item.is-active {
    background-color: rgba(226, 240, 251, 1);
  }
}
</style>
