<template>
  <div class="base-dialog">
    <el-dialog
      :model-value="modelValue"
      :title="title"
      :width="width"
      :before-close="handleClose"
      top="5vh"
    >
      <slot name="content">132</slot>
      <slot name="footer">
        <div class="base-dialog-footer">
          <el-button v-if="buttons.length > 0" @click="close">
            {{ buttons[0] }}
          </el-button>
          <el-button v-if="buttons.length > 1" type="primary" @click="confirm">
            {{ buttons[1] }}
          </el-button>
        </div>
      </slot>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
const emits = defineEmits(['update:modelValue', 'confirm']);

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '800px'
  },

  title: {
    type: String,
    default: '标题'
  },
  buttons: {
    type: Array as PropType<string[]>,
    default: () => ['关闭', '确定']
  }
});

const close = () => {
  emits('update:modelValue', false);
};

const confirm = () => {
  emits('confirm');
};

const handleClose = (done: () => void) => {
  done();
  // 不调用此方法会导致点击x关闭模态框后无法再次显示
  emits('update:modelValue', false);
};
</script>

<style lang="scss">
.base-dialog {
  .el-dialog__header {
    text-align: center;
  }
  .base-dialog-footer {
    text-align: center;
    padding-top: 20px;
    .el-button {
      width: 112px;
    }
  }
}
</style>
