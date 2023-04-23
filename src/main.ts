import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'default-passive-events';
import 'reset.css';

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
