<template>
  <div class="aside">
    <!-- 任务 -->
    <el-row class="element">
      <el-col
        :span="24"
        :draggable="true"
        @dragstart="
          (e) => cellDragstartEventHandle(e, CONTANT.NORMAL_TASK_FACTORY)
        "
      >
        <WorkTask />
      </el-col>
    </el-row>
    <!-- 用户任务 -->
    <el-row class="element">
      <el-col
        :span="24"
        :draggable="true"
        @dragstart="
          (e) => cellDragstartEventHandle(e, CONTANT.CUSTOMER_TASK_FACTORY)
        "
      >
        <WorkUserTask />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as CONTANT from "./tools/contant";
import WorkTask from "./WorkTask.vue";
import WorkUserTask from "./WorkUserTask.vue";
import GenerateBaseTaskFactory from "./tools/GenerateBaseTaskFactory";

// 自定义事件类型
const emits = defineEmits(["cellDragstartEvent"]);

// 拖拽开始事件
const cellDragstartEventHandle = (e, factoryMark) => {
  const instance = GenerateBaseTaskFactory.generateTask(factoryMark);
  emits("cellDragstartEvent", e, instance);
};
</script>

<style scoped>
.aside {
  padding: 20px;
  background-color: #fff;
}
.aside .element {
  margin: 15px 0;
}
.aside .element:first-child {
  margin-top: 0;
}
</style>
