<!-- <template>
  <div>
    <iframe
      ref="iframe"
      src="http://192.168.2.105:8087"
      frameborder="0"
      width="2000"
      height="1000"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const iframe = ref<HTMLIFrameElement>();

onMounted(() => {
  iframe.value!.onload = () => {
    iframe.value!.contentWindow!.postMessage(
      '111',
      'http://192.168.2.107:18892'
    );
  };
});
</script>

<style scoped></style> -->
