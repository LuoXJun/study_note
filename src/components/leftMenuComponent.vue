<template>
  <template v-for="item in list" :key="item">
    <el-sub-menu
      v-if="item.meta?.type == 'menu' && !item.meta?.isHidden"
      :index="parentPath + item.path"
    >
      <template #title>
        <template v-if="getComponent(item.meta?.icon as string).isElIcon">
          <el-icon>
            <component :is="getComponent(item.meta?.icon as string).url" />
          </el-icon>
        </template>
        <template v-else>
          <el-icon>
            <img :src="getComponent(item.meta?.icon as string).url" />
          </el-icon>
        </template>
        <span style="padding-left: 10px; box-sizing: border-box">
          {{ item.meta?.title as string }}
        </span>
      </template>
      <leftMenuComponent
        :list="item.children"
        :parent-path="parentPath + item.path + '/'"
      ></leftMenuComponent>
    </el-sub-menu>
    <el-menu-item
      v-if="item.meta?.type == 'link' && !item.meta?.isHidden"
      :index="parentPath + item.path"
    >
      <template v-if="getComponent(item.meta?.icon as string).isElIcon">
        <el-icon>
          <component :is="getComponent(item.meta?.icon as string).url" />
        </el-icon>
      </template>
      <template v-else>
        <el-icon>
          <img :src="getComponent(item.meta?.icon as string).url" />
        </el-icon>
      </template>
      <span style="padding-left: 10px; box-sizing: border-box">
        {{ item.meta?.title }}
      </span>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import * as icons from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { importImgs } from '@/utils/getAssets';
// 不想再路由中将路径写成/a/b/c的形式，需要在递归时带上父级路径
defineProps({
  list: {
    type: Object as PropType<RouteRecordRaw[]>,
    default: null
  },
  parentPath: {
    type: String,
    default: null
  }
});

// 菜单图标
const keys = Reflect.ownKeys(icons);
const getComponent = (value: string): { isElIcon: boolean; url: string } => {
  if (keys.includes(value)) {
    for (const key in icons) {
      // @ts-ignore
      if (key == value) return { isElIcon: true, url: icons[key] };
    }
  }

  const url = importImgs(value);
  return { isElIcon: false, url };
};
</script>

<style scoped lang="scss">
.el-sub-menu__title {
  img {
    width: 18px;
    height: 18px;
  }
}
</style>
