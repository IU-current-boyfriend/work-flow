<template>
  <div class="progress-container">
    <el-progress type="dashboard" :percentage="percentageData">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
const percentageData = ref(0);

// 注入的依赖名称
const getNode = inject("getNode");

onMounted(() => {
  if (typeof getNode === "function") {
    const node = getNode();
    node.on("change:data", ({ current }) => {
      percentageData.value = current.percentage;
    });
  }
});
</script>

<style></style>
