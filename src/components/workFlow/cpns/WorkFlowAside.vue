<template>
  <div class="aside">
    <!-- 任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <Work-Task @click="workTaskHandle" />
      </el-col>
    </el-row>
    <!-- 服务任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <Work-User-Task @click="workUserTaskHandle" />
      </el-col>
    </el-row>
    <!-- 服务任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <Work-User-Task @click="workUserTaskHandle2" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import WorkTask from "./WorkTask.vue";
import WorkUserTask from "./WorkUserTask.vue";
import GenerateBaseTaskFactory from "./tools/GenerateBaseTaskFactory";
import GenerateBaseJobFactory from "./tools/GenerateBaseJobFactory";
import {
  NORMAL_TASK_FACTORY,
  CUSTOMER_TASK_FACTORY,
  JOB_MANUAL_APPROVAL,
  JOB_AUTOMATIC_CONSENT,
  JOB_AUTOMATIC_REJECT,
} from "./tools/contant";

const workTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(NORMAL_TASK_FACTORY);

  const extension = instance
    .addExtension()
    .getExtensionByIndex(0)
    .setName("aaaa")
    .setValue(11111)
    .clear();

  console.log("instance: =>", instance);
};

const workUserTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(CUSTOMER_TASK_FACTORY);
  console.log("user: =>", instance);
};

const workUserTaskHandle2 = () => {
  const instance = GenerateBaseJobFactory.generateJob(JOB_MANUAL_APPROVAL);

  console.log("job: =>", instance);
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
