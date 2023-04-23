<template>
  <div class="auth">
    <el-card shadow="hover">
      <p style="text-align: right">
        <el-tag type="success">tips:父子层级相互独立</el-tag>
      </p>
      <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        node-key="path"
        highlight-current
        check-strictly
        :props="defaultProps"
      />
      <br />
      <el-button type="primary" link @click="submit">保存</el-button>
      <el-button type="primary" link @click="drawer = true">新建菜单</el-button>
    </el-card>
    <el-drawer v-model="drawer" :with-header="false" direction="ttb" size="50%">
      <addNewMenuVue :options="getCheckedKeys(data)._keyvalue">
        <template #cancel>
          <el-button @click="drawer = false">取消</el-button>
        </template>
      </addNewMenuVue>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from 'element-plus';
import { useMenuStore } from '@/store/useMenu';
import { useDeepClone } from '@/hooks/useDeepClone';
import { routeConfig } from '@/router/config/routes';
import addNewMenuVue from './component/addNewMenu.vue';
const store = useMenuStore();

const defaultProps = ref({ children: 'children', label: 'title' });
// 默认的全部权限
const data = ref<RouteOptions[]>([]);
const ischecked = ref<any[]>([]);
const drawer = ref(false);

const treeRef = ref<InstanceType<typeof ElTree>>();
data.value = routeConfig;

// 获取最终提交的菜单权限
const recursion = (_menus: RouteOptions[]) => {
  for (let i = _menus.length - 1; i >= 0; i--) {
    if (!ischecked.value.includes(_menus[i].path)) {
      _menus.splice(i, 1);
      continue;
    }
    if (_menus[i].children && _menus[i].children!.length > 0) {
      recursion(_menus[i].children!);
    }
  }
  return _menus;
};

// 获取当前菜单的键和键值对
const getCheckedKeys = (menus: RouteOptions[]) => {
  const _keys: string[] = [];
  // 层级
  const _keyvalue: { label: string; value: string; type: string }[] = [];

  menus.forEach((item) => {
    // if (item.type == 'menu')
    _keyvalue.push({
      label: item.title,
      value: item.path,
      type: item.type ?? ''
    });

    _keys.push(item.path);

    if (item.children && item.children.length > 0) {
      _keys.push(...getCheckedKeys(item.children)._keys);
      _keyvalue.push(...getCheckedKeys(item.children)._keyvalue);
    }
  });
  return { _keys, _keyvalue };
};

const setAuth = () => {
  // 设置选中的权限
  treeRef.value!.setCheckedKeys(getCheckedKeys(store.menu)._keys);
};
setTimeout(() => {
  setAuth();
}, 0);

const submit = () => {
  const _list = treeRef.value!.getCheckedKeys();
  const _listHalf = treeRef.value!.getHalfCheckedKeys();
  ischecked.value = [..._list, ..._listHalf];

  // 提交新的路由表
  store.menu = recursion(useDeepClone(data.value));
};
</script>

<style scoped></style>
