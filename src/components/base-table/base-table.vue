<template>
  <div class="base-table">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      v-bind="options"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      @selection-change="handleSelectionChange"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column
        v-if="index"
        type="index"
        width="60"
        label="序号"
        align="center"
      >
        <template #default="scope">
          {{
            (pageInfo.pageIndex - 1) * pageInfo.pageSize + (scope.$index + 1)
          }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="selection"
        type="selection"
        width="80"
        align="center"
        label-class-name="checkAll"
      />
      <template v-for="item in tableColumn" :key="item.property">
        <el-table-column
          v-if="item.isShowColumn ?? true"
          :label="item.label"
          :property="item.filed"
          align="center"
          v-bind="item.options"
        >
          <template #default="scope">
            <slot
              :name="item.filed"
              :row="{
                ...scope.row,
                $index: scope.$index
              }"
            >
              {{ scope.row[item.filed] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="options.hasPage ?? true"
      :current-page="pageInfo.pageIndex"
      :page-size="pageInfo.pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @update:current-page="handleCurrentChange($event)"
      @update:page-size="handleSizeChange($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus';
import { PropType } from 'vue';
const emits = defineEmits(['selected', 'update:modelValue']);

const props = defineProps({
  tableData: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [{}]
  },
  tableColumn: {
    type: Array as PropType<ITableColumn[]>,
    default: () => [{}]
  },
  index: {
    type: Boolean,
    default: () => false
  },
  selection: {
    type: Boolean,
    default: () => false
  },
  multipleSelection: {
    type: Array,
    default: () => []
  },
  options: {
    type: Object as PropType<ITable>,
    default: () => ({
      border: true
    })
  },
  headerCellStyle: {
    type: Function as PropType<
      (data: {
        row: any;
        rowIndex: number;
        column: any;
        columnIndex: number;
      }) => Record<string, any>
    >,
    default: () => ({})
  },
  cellStyle: {
    type: Function as PropType<
      (data: {
        row: any;
        rowIndex: number;
        column: any;
        columnIndex: number;
      }) => Record<string, any>
    >,
    default: () => ({})
  },
  pageInfo: {
    type: Object as PropType<{ pageSize: number; pageIndex: number }>,
    default: () => ({
      pageSize: 10,
      pageIndex: 1
    })
  },
  total: {
    type: Number,
    default: () => 0
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 40, 50]
  }
});
const multipleTableRef = ref<InstanceType<typeof ElTable>>();

watch(
  props.multipleSelection,
  () => {
    nextTick(() => {
      if (props.multipleSelection.length > 0) {
        props.multipleSelection.forEach((row) => {
          multipleTableRef.value!.toggleRowSelection(row, true);
        });
      }
    });
  },
  { immediate: true }
);

const handleSelectionChange = (value: any) => {
  emits('selected', { value, type: 'change' });
};
const select = (value: any, row: any) => {
  emits('selected', { value, row, type: 'select' });
};
const selectAll = (value: any) => {
  emits('selected', { value, type: 'selectAll' });
};

const handleCurrentChange = (val: number) => {
  emits('update:modelValue', { ...props.pageInfo, pageIndex: val });
};
const handleSizeChange = (val: number) => {
  emits('update:modelValue', { ...props.pageInfo, pageSize: val });
};
</script>

<style lang="scss">
.base-table {
  .checkAll {
    position: relative;
    text-align: left !important;
  }

  .checkAll .cell::after {
    color: #909399;
    font-size: 13px;
    font-weight: bold;
    content: '全选';
    display: block;
    position: absolute;
    z-index: 1;
    left: 35px;
  }
  .el-pagination {
    justify-content: flex-end;
    padding: 20px;
  }
}
</style>
