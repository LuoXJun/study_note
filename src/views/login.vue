<template>
  <div class="login">
    <div class="loginBox">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/store/useMenu';
import { routeConfig } from '@/router/config/routes';
import { logBackground } from './login';
const store = useMenuStore();
const router = useRouter();
const scene = shallowRef<THREE.Scene>();

const login = () => {
  store.$patch((state) => {
    state.menu = routeConfig;
  });
  sessionStorage.setItem('token', '123');
  router.push('/');
  console.log(router.getRoutes());
};
// login();

onMounted(() => {
  scene.value = logBackground();
  console.log(scene.value);
});

onUnmounted(() => {
  scene.value?.traverse((ele) => {
    //@ts-ignore
    if (ele.isMesh) scene.value?.remove(ele);
  });
  console.log(scene.value);
});
</script>
<style lang="scss">
.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 32px;
}
</style>
