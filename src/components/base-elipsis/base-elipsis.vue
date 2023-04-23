<template>
  <div class="base-elipsis">
    <p ref="textRef" class="text">
      <slot></slot>
    </p>
    <p v-if="isShow == 'exp'" style="min-width: 80px">
      <span style="color: #fff">...</span>
      <span class="baseColor" @click="operation('exp')">展开</span>
    </p>
    <p
      v-if="isShow == 'close'"
      class="baseColor"
      style="width: 80px"
      @click="operation('close')"
    >
      收起
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps({
  line: {
    type: Number,
    default: 2
  }
});

const textRef = ref();
const isShow = ref('');

onMounted(() => {
  textRef.value.setAttribute('style', `max-height:${27 * props.line}px`);
  setText();
});

const setText = () => {
  const height = textRef.value.offsetHeight;
  if (height <= 26 * props.line) return (isShow.value = '');
  if (height > 27 * props.line) return (isShow.value = 'close');
  isShow.value = 'exp';
  return;
};

const operation = (type: 'exp' | 'close') => {
  if (type == 'exp') {
    textRef.value.setAttribute('style', `height:auto`);
    setText();
  } else {
    textRef.value.setAttribute('style', `height:${27 * props.line}px`);
    setText();
  }
};
</script>

<style lang="scss" scoped>
.base-elipsis {
  display: flex;
  align-items: flex-end;
  .text {
    color: #fff;
    width: 100%;
    overflow: hidden;
    word-break: break-all;
    line-height: 26px;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease-in-out;
  }
  .baseColor {
    color: #00ffde;
    line-height: 26px;
    cursor: pointer;
    padding-left: 5px;
  }
}
</style>
