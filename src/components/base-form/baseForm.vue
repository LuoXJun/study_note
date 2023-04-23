<template>
  <el-form
    ref="baseFormRef"
    :model="modelValue"
    :label-width="labelWidth"
    :rules="rules"
    class="lxj-class"
  >
    <el-row>
      <template v-for="item in formItemList" :key="item.type">
        <el-col
          v-bind="item.useLayout == false ? undefined : layout"
          :span="item.span"
        >
          <el-form-item
            :label="item.label"
            :label-width="item.labelWidth"
            :prop="item.filed"
            :rules="item.rules"
          >
            <template v-if="item.type == 'input' || item.type == 'password'">
              <el-input
                :model-value="modelValue[item.filed]"
                clearable
                :disabled="item.disabled"
                :type="item.type"
                :placeholder="item.placeholder"
                v-bind="item.input"
                @update:model-value="change($event, item.filed)"
              />
            </template>
            <template v-else-if="item.type == 'select'">
              <el-select
                :model-value="modelValue[item.filed]"
                clearable
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                v-bind="item.select"
                @update:model-value="change($event, item.filed)"
              >
                <el-option
                  v-for="option in item.select?.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-else-if="item.type == 'textarea'">
              <el-input
                type="textarea"
                :model-value="modelValue[item.filed]"
                clearable
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                v-bind="item.textarea"
                @update:model-value="change($event, item.filed)"
              />
            </template>
            <template v-else-if="item.type == 'date'">
              <el-date-picker
                :model-value="modelValue[item.filed]"
                clearable
                :disabled="item.disabled"
                type="date"
                :placeholder="item.placeholder ?? '请选择时间'"
                value-format="YYYY-MM-DD HH:mm:ss"
                v-bind="item.date"
                @update:model-value="change($event, item.filed)"
              />
            </template>
            <template v-else-if="item.type == 'daterange'">
              <el-date-picker
                :model-value="modelValue[item.filed]"
                clearable
                :disabled="item.disabled"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                v-bind="item.date"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @update:model-value="change($event, item.filed)"
              />
            </template>
            <template v-else-if="item.type == 'radio'">
              <el-radio-group
                :model-value="modelValue[item.filed]"
                :disabled="item.disabled"
                @update:model-value="change($event, item.filed)"
              >
                <el-radio
                  v-for="option in item.radio?.options"
                  :key="option.value"
                  :label="option.value"
                  :border="option.border"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </template>
            <template v-else-if="item.type == 'checkbox'">
              <el-checkbox-group
                :model-value="modelValue[item.filed]"
                @update:model-value="change($event, item.filed)"
              >
                <el-checkbox
                  v-for="option in item.checkbox?.options"
                  :key="option.value"
                  :label="option.label"
                  :border="option.border"
                />
              </el-checkbox-group>
            </template>
            <template v-else-if="item.type == 'slot'">
              <slot :name="item.filed" :scope="item"></slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
      <div style="flex: 1; text-align: right">
        <slot name="footer" :data="modelValue"></slot>
      </div>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({}),
    required: true
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: () => '80px'
  },
  formItemList: {
    type: Array as PropType<IformItem[]>,
    default: () => [],
    required: true
  },
  layout: {
    type: Object as PropType<any>,
    default: () => ({
      xl: 6,
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    })
  }
});

const baseFormRef = ref<FormInstance>();

// 验证
const validate = () => {
  return new Promise((res) => {
    baseFormRef.value?.validate((valid) => {
      if (valid) return res(true);
      ElMessage.warning('请完成填写表单项');
    });
  });
};

// 监听变化事件，更新父组件值
const change = ($event: any, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [value]: $event });
};

defineExpose({ validate });
</script>

<style>
.lxj-class .el-col {
  padding: 0 5px;
}
</style>
<style scoped>
.base-button-group {
  text-align: center;
}
</style>
