<template>
  <div class="work-flow-cell">
    <el-container class="cell-container">
      <el-aside class="cell-aside">
        <WorkFlowAside />
      </el-aside>
      <el-main class="cell-main">
        <Work-Flow-Cell :graphInstanceProps="graphInstanceProps" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import WorkFlowCell from "./cpns/WorkFlowCell.vue";
import WorkFlowAside from "./cpns/WorkFlowAside.vue";

const graphInstanceProps = ref({
  background: {
    color: "#F2F7FA",
  },
});
</script>

<style scoped>
.work-flow-cell {
  width: 100%;
  height: 100%;
}
.work-flow-cell .cell-container {
  height: 100%;
}
.work-flow-cell .cell-aside {
  width: 20%;
  height: 100%;
  background-color: pink;
}

.work-flow-cell .cell-main {
  height: 100%;
  background-color: aqua;
}
</style>
