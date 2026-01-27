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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["dialogCloseEventHandle"]);
const dialogVisible = ref(false);
const setDialogVisible = (visible) => (dialogVisible.value = visible);

const openDialog = () => setDialogVisible(true);
const closeDialog = () => setDialogVisible(false);
const dialogCloseEventHandle = () => emits("dialogCloseEventHandle");

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style></style>
