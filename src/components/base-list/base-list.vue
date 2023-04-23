<template>
  <div class="base-list-class">
    <div class="base-list-container">
      <el-row>
        <el-row
          v-for="item in list"
          :key="item.label"
          class="base-list-box"
          :style="{ width: 100 / (item.column ?? column) + '%' }"
        >
          <el-col :span="(item.span ?? 6) * (item.column ?? column)">
            <span>
              {{ item[label] }}
            </span>
          </el-col>
          <el-col :span="24 - (item.span ?? 6) * (item.column ?? column)">
            <span v-if="item.prop">
              <slot :name="item.prop" :row="item">{{ item[value] }}</slot>
            </span>
            <span v-else>
              {{ item[value] ?? '/' }}
            </span>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  list: {
    type: Array as PropType<ITableList[]>,
    default: () => [{ label: 'label', value: 'value' }]
  },
  /**默认一行展示两列*/
  column: {
    type: Number,
    default: () => {
      return 2;
    }
  },
  /**使用新的键值对代替label，value*/
  label: {
    type: String,
    default: () => {
      return 'label';
    }
  },
  value: {
    type: String,
    default: () => {
      return 'value';
    }
  }
});
</script>

<style lang="scss" scoped>
.base-list-class {
  margin: 20px 0;

  .base-list-container {
    border: 1px solid #caced1;
    border-bottom: 0;
    border-right: 0;

    .base-list-box {
      display: inline-flex;
      border-bottom: 1px solid #caced1;

      > .el-col {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        word-break: break-all;
        box-sizing: border-box;
        border-right: 1px solid #caced1;

        > span {
          line-height: 26px;
        }
      }

      > .el-col:first-child {
        background-color: #f3f7fd;
        text-align: center;
      }
    }
  }
}
</style>
