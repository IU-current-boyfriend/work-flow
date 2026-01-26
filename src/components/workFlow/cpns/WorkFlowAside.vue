<template>
  <div class="aside">
    <!-- 任务 -->
    <el-row class="element">
      <el-col :span="24">
        <WorkTask @click="workTaskHandle" />
      </el-col>
    </el-row>
    <!-- 用户任务 -->
    <el-row class="element">
      <el-col :span="24">
        <WorkUserTask @click="workUserTaskHandle" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as CONTANT from "./tools/contant";
import WorkTask from "./WorkTask.vue";
import WorkUserTask from "./WorkUserTask.vue";
import GenerateBaseTaskFactory from "./tools/GenerateBaseTaskFactory";

// 自定义事件类型
const emits = defineEmits(["update:clickTaskHandle"]);

// 审批类型实例对象
const approvalModelInstance = ref();

const workTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(
    CONTANT.NORMAL_TASK_FACTORY
  );
  emits("update:clickTaskHandle", instance);
};

const workUserTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(
    CONTANT.CUSTOMER_TASK_FACTORY
  );
  emits("update:clickTaskHandle", instance);
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
