<template>
  <div>
    <baseForm ref="authFormRef" v-model="form" :form-item-list="config">
      <template #icon>
        <el-select v-model="form!.icon">
          <el-option
            v-for="item in getComponent()"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; width: 20px">
              <component
                :is="
                  //@ts-ignore
                  icons[item.label]
                "
              ></component>
            </span>
          </el-option>
        </el-select>
      </template>
      <template #level>
        <el-select v-model="form.level">
          <el-option label="无" value=""></el-option>
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </template>
    </baseForm>
    <div style="text-align: center">
      <el-button type="primary" @click="add">确定</el-button>
      <slot name="cancel"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import baseForm from '@/components/base-form/baseForm.vue';
import { config } from '../config';
import * as icons from '@element-plus/icons-vue';
import { useMenuStore } from '@/store/useMenu';
import { ElMessage } from 'element-plus';
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const store = useMenuStore();
const authFormRef = ref();
const form = ref<RouteOptions & { level: string }>({
  icon: '',
  title: '',
  path: '',
  component: '',
  level: '',
  type: 'link'
});

watch(
  form,
  () => {
    console.log(123);
    props.options.forEach((item: any) => {
      if (item.label == form.value.level) {
        if (item.type !== 'menu' && form.value.type === 'menu') {
          form.value.level = '';
          ElMessage.warning('菜单不能作为菜单之外的子集');
        }
        if (item.type == 'link' && form.value.type !== 'other') {
          form.value.level = '';
          ElMessage.warning('按钮的子级只能是详情页');
        }
        if (item.type == 'other' && form.value.type !== 'other') {
          form.value.level = '';
          ElMessage.warning('详情页的子级只能是详情页');
        }
      }
    });
  },
  { deep: true }
);

// 获取当前全部的图标
const getComponent = () => {
  const _arr = [];
  for (const key in icons) {
    // @ts-ignore
    _arr.push({ label: key, value: icons[key] });
  }
  return _arr;
};

const _recursion = (_menus: RouteOptions[]) => {
  for (const menu of _menus) {
    if (menu.path == form.value.level) {
      if (menu.children) menu.children.push(form.value);
      else menu.children = [form.value];
    } else if (menu.children) _recursion(menu.children);
  }
};
// 提交新增的菜单
const add = () => {
  authFormRef.value?.validate().then(() => {
    if (form.value.level == '') return store.menu.push(form.value);
    return _recursion(store.menu);
  });
};
</script>

<style scoped></style>
