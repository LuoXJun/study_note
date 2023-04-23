<template>
  <div class="header-nav">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in $route.matched" :key="item.path">
        <el-breadcrumb-item
          v-if="item.meta?.title"
          :class="{ canJump: item.meta.type != 'menu' }"
          @click="goPath(item)"
        >
          {{ item.meta?.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div class="logout">
      <span @click="logout">退出</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { RouteRecord } from 'vue-router';
const router = useRouter();
const logout = () => {
  router.push('/login');
};

const goPath = (row: RouteRecord) => {
  if (row.meta.type == 'menu') return;
  router.push(row.path);
};
</script>
<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .canJump {
    cursor: pointer;
  }

  .el-breadcrumb {
    padding: 20px 0;
  }

  .logout {
    flex: 1;
    text-align: right;
    span {
      cursor: pointer;
    }
  }
}
</style>
