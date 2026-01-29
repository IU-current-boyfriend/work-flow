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
import { ref } from "vue";
import * as CONTANT from "./tools/contant";
import WorkTask from "./WorkTask.vue";
import WorkUserTask from "./WorkUserTask.vue";
import GenerateBaseTaskFactory from "./tools/GenerateBaseTaskFactory";

// 自定义事件类型
const emits = defineEmits(["update:clickTaskHandle"]);

const workTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(
    CONTANT.NORMAL_TASK_FACTORY
  );
  // instance
  //   .addActuator()
  //   .addActuator()
  //   .addActuator()
  //   .addExtension()
  //   .addExtension()
  //   .addExtension()
  //   .actuators.forEach((a, i) => {
  //     a.eventType = "自定义类型" + (i + 1);
  //     a.choseClass = "选择类" + (i + 1);
  //     a.clazz = "选择类" + (i + 1);
  //     a.fields = undefined;
  //   });

  // instance.notation.start = [1, 2, 3];
  // instance.notation.end = [1, 2, 4];

  // instance.extensions.forEach((extension, index) => {
  //   extension.name = "自定义字段" + (index + 1);
  //   extension.value = "自定义类型" + (index + 1);
  // });

  emits("update:clickTaskHandle", instance);
};

const workUserTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(
    CONTANT.CUSTOMER_TASK_FACTORY
  );
  // instance
  //   .addActuator()
  //   .addActuator()
  //   .addExtension()
  //   .addExtension()
  //   .actuators.forEach((a, i) => {
  //     a.eventType = "自定义类型" + (i + 1);
  //     a.choseClass = "选择类" + (i + 1);
  //     a.clazz = "选择类" + (i + 1);
  //     a.fields = undefined;
  //   });

  // instance.extensions.forEach((extension, index) => {
  //   extension.name = "自定义字段" + (index + 1);
  //   extension.value = "自定义类型" + (index + 1);
  // });

  // instance.notation.start = [14, 15, 16];
  // instance.notation.end = [14, 19, 20];

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
