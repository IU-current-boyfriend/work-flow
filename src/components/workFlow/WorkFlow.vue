<template>
  <div class="work-flow-cell">
    <el-container class="cell-container">
      <el-aside class="cell-aside">
        <WorkFlowAside @update:clickTaskHandle="clickTaskHandle" />
      </el-aside>
      <el-main class="cell-main">
        <WorkFlowCell />
      </el-main>
      <el-aside class="cell-aside-option" :width="collapseWidth">
        <WorkFlowOptionAside
          :instance="propsInstance"
          @update:changeCollapseHandle="changeCollapseHandle"
        />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref, watch, nextTick } from "vue";
import { GENERAL_TASK } from "./cpns/tools/contant";
import WorkFlowCell from "./cpns/WorkFlowCell.vue";
import WorkFlowAside from "./cpns/WorkFlowAside.vue";
import WorkFlowOptionAside from "./cpns/WorkFlowOptionAside.vue";
import GenerateBaseTaskFactory from "./cpns/tools/GenerateBaseTaskFactory";

const collapseWidth = ref("160px"); // 160 -> 451
const propsInstance = ref(GenerateBaseTaskFactory.generateTask(GENERAL_TASK));

// 提供给弹窗子组件弹窗使用
provide("collapseWidth", collapseWidth);

/**
 * 设置伸缩框宽度
 */
const changeCollapseWidth = (width) => {
  collapseWidth.value = width;
};

/**
 * 是否伸缩
 */
const changeCollapseHandle = (collapse) => {
  collapse
    ? changeCollapseWidth("451px")
    : setTimeout(() => {
        changeCollapseWidth("160px");
      }, 300);
};

const clickTaskHandle = (instance) => {
  // 整体更新实例对象,业务需求
  propsInstance.value = instance;
  // 设置伸缩框
  changeCollapseHandle(false);
};
</script>

<style scoped>
.work-flow-cell {
  width: 100%;
  height: 100%;
}
.work-flow-cell .cell-container {
  width: 100%;
  height: 100%;
}
.work-flow-cell .cell-aside {
  width: 20%;
  height: 100%;
  border-right: 1px solid #eee;
}

.work-flow-cell .cell-main {
  width: 100%;
  height: 100%;
  padding: 0;
}

.cell-aside-option {
  padding: 20px;
  box-sizing: border-box;
  border-left: 1px solid #eee;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
