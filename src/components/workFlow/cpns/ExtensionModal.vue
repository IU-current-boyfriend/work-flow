<template>
  <el-dialog
    v-model="dialogVisible"
    title="属性配置"
    width="600"
    @close="dialogCloseEventHandle"
  >
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogSubmitEventHandle">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

// 自定义事件
const emits = defineEmits([
  "dialogCloseEventHandle",
  "dialogSubmitEventHandle",
]);

const dialogVisible = ref(false);
const setDialogVisible = (visible) => (dialogVisible.value = visible);
const openDialog = () => setDialogVisible(true);
const closeDialog = () => setDialogVisible(false);

/**
 * 弹窗关闭
 */
const dialogCloseEventHandle = () => emits("dialogCloseEventHandle");

/**
 * 确认事件
 */
const dialogSubmitEventHandle = () => emits("dialogSubmitEventHandle");

// 暴露事件
defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style></style>
