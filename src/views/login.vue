<template>
  <div>
    <el-button size="large" @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/useMenu';
import { routeConfig } from '@/router/config/routes';
const store = useMenuStore();
const router = useRouter();

const login = () => {
  store.$patch((state) => {
    state.menu = routeConfig;
  });
  sessionStorage.setItem('token', '123');
  router.push('/');
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/logo.png');
}
</style>
