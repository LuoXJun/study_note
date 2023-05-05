import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import unElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { UserConfigExport } from 'vite';
import checker from 'vite-plugin-checker';
import * as path from 'path';

const plugins = [
  vue(),
  checker({
    typescript: true,
    vueTsc: true
  }),
  AutoImport({
    dts: 'src/types/autoImport/auto-import.d.ts',
    imports: ['vue', 'vue-router'],
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'Icon'
      })
    ]
  }),
  ElementPlus(),
  Components({
    dts: 'src/types/component/component.d.ts',
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        enabledCollections: ['ep']
      })
    ]
  }),
  Icons({
    autoInstall: true
  })
];

// dev
const config: UserConfigExport = {
  plugins,
  base: './',
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/index.scss' as *;`
      }
    }
  },
  server: {
    host: true,
    port: 3005,
    hmr: true,
    open: '/index.html',
    proxy: {
      '^/dev': {
        target: 'http://192.168.3.65:8808',
        secure: false,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev/, '')
      }
    }
  }
};

// prod
const buildConfig: UserConfigExport = {
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]',
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia', 'axios'],
          lodash: ['lodash'],
          cesium: ['cesium']
        }
      }
    }
    // sourcemap:true
  },
  esbuild: {
    drop: ['debugger', 'console']
  }
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return config;
  } else {
    plugins.push(
      unElementPlus({
        useSource: true
      })
    );
    return { ...config, ...buildConfig };
  }
});
