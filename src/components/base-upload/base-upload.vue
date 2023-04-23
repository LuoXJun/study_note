<template>
  <div class="base-upload">
    <el-upload
      ref="upload"
      class="upload-demo"
      action="#"
      :auto-upload="false"
      :list-type="options.listType"
      :file-list="list"
      :multiple="options.size === 1 ? false : true"
      :on-change="onChange"
      :before-remove="beforeRemove"
      :on-preview="preview"
    >
      <el-button type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">
          <span class="file-tips">{{ tips }}</span>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const emits = defineEmits<{
  (e: 'remove', file: UploadFiles, filelist: UploadFiles[]): void;
  (e: 'change', file: UploadFiles, filelist: UploadFiles[]): void;
  (e: 'preview', file: UploadFiles): void;
}>();

const props = defineProps({
  /**数据回显或展示时后端返回的文件列表*/
  list: {
    type: Array as PropType<UploadFiles[]>,
    default: () => []
  },
  options: {
    type: Object as PropType<UploadFileOptions>,
    default: () => ({
      size: 5,
      limit: 100,
      listType: 'text',
      fileType: []
    })
  },
  tips: {
    type: String,
    default: () => '请上传文件'
  }
});

// formData.append('file', new File([item.raw], item.name.replace(/\s*/g, "").replace(/\(|\)/g, '')))

const onChange = (file: UploadFiles, filelist: UploadFiles[]) => {
  const index = filelist.indexOf(file);
  filelist.splice(index, 1);

  // 限制上传大小
  if (file.size! / 1024 / 2024 > props.options.size) {
    ElMessage.warning(`上传文件大小不能超过${props.options.size}M`);
    return;
  }

  //   限制上传数量
  if (props.list.length >= props.options.limit) {
    ElMessage.warning(`文件上传数量不能超过${props.options.limit}`);
    return;
  }

  // 限制上传类型
  let type = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
  if (
    props.options.fileType.length > 0 &&
    props.options.fileType.indexOf(type) == -1
  )
    return ElMessage.warning(
      `请上传${props.options.fileType.join(',')}格式的文件`
    );

  filelist.splice(index + 1, 0, file);
  return emits('change', file, filelist);
};

const beforeRemove = (
  file: UploadFiles,
  filelist: UploadFiles[]
): Promise<boolean> => {
  return new Promise((res) => {
    ElMessageBox.confirm('是否确定删除当前文件', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        /**
         * options是否有id是判断当前文件是否成功上传的依据
         * 单文件自动上传时可不设置
         * 自定义批量上传时在提交时需要区分上传的和未上传的文件
         * */
        if (file.options?.id) return emits('remove', file, filelist);
        ElMessage.success('删除成功');
        res(true);
      })
      .catch(() => {
        ElMessage.info('取消删除');
      });
  });
};

// 预览
const preview = (file: UploadFiles) => {
  emits('preview', file);
};
</script>

<style scoped lang="scss">
.base-upload {
  max-width: 400px;
}
.file-tips {
  color: #999;
  font-size: 14px;
}
</style>
