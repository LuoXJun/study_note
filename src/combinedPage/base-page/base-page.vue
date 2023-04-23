<template>
  <div class="result">
    <baseForm v-model="form" :form-item-list="formConfig">
      <template #footer>
        <slot name="footer" :item="form">
          <el-button type="primary" @click="getForm">查询</el-button>
          <el-button @click="form = {}">重置</el-button>
        </slot>
      </template>
    </baseForm>
    <baseTable
      v-model="pageInfo"
      index
      :table-column="tableConfig"
      :table-data="tableData"
      :total="total"
    >
      <template v-for="item in tableConfig" #[item.filed]="{ row }">
        <slot :name="item.filed" :scope="row">
          {{ row[item.filed] }}
        </slot>
      </template>
    </baseTable>
  </div>
</template>
<script setup lang="ts">
import baseForm from '@/components/base-form/baseForm.vue';
import baseTable from '@/components/base-table/base-table.vue';
import { PropType } from 'vue';
const emit = defineEmits(['getForm']);
defineProps({
  formConfig: {
    type: Array as PropType<IformItem[]>,
    default: () => []
  },
  tableConfig: {
    type: Array as PropType<ITableColumn[]>,
    default: () => []
  },
  tableData: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
});

const form = ref<Record<string, any>>({});
const pageInfo = ref({
  pageIndex: 1,
  pageSize: 10
});

watch(pageInfo, () => {
  getForm();
});
const getForm = () => {
  pageInfo.value = {
    pageIndex: 1,
    pageSize: 10
  };
  emit('getForm', form.value);
};
</script>
<style scoped></style>
