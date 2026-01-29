<template>
  <el-dialog
    v-model="dialogVisible"
    title="字段配置"
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

const emits = defineEmits([
  "dialogCloseEventHandle",
  "dialogSubmitEventHandle",
]);
const dialogVisible = ref(false);
const setDialogVisible = (visible) => (dialogVisible.value = visible);

const openDialog = () => setDialogVisible(true);
const closeDialog = () => setDialogVisible(false);
const dialogCloseEventHandle = () => emits("dialogCloseEventHandle");
const dialogSubmitEventHandle = () => {
  // 触发事件
  emits("dialogSubmitEventHandle");
  // 关闭弹窗
  closeDialog();
};
defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style></style>
