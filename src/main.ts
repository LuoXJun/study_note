import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'default-passive-events';
import 'reset.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium';
import * as THREE from 'three';
window.Cesium = Cesium;
window.THREE = THREE;

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZiOGI5Yi0wN2E0LTRlMTgtOTMwYi04NDdhNDg4MTIyNjUiLCJpZCI6MTM1MTU0LCJpYXQiOjE2ODIyNDM3Mjh9.32mOaQTRHc_l41eaI-sTVx4tVODDsrAoAG6Vo_DTL-U';
window.CESIUM_BASE_URL = '/Build/Cesium/';

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  if (store.$id === 'menu') {
    // 监听只会在$patch之后触发一次
    store.$subscribe((_, state) => {
      sessionStorage.setItem('state', JSON.stringify(state));
    });
  }
});

app.use(pinia);
app.use(router);

app.mount('#app');
