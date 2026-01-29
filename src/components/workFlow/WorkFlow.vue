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
          v-model:approval="approval"
          @update:changeCollapseHandle="changeCollapseHandle"
        />
        <el-button type="primary" @click="hadelClick">点击</el-button>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import { arrayIsEmpty, isNil, forOwn, unionSort } from "./cpns/tools/utils";
import * as CONTANT from "./cpns/tools/contant";
import WorkFlowCell from "./cpns/WorkFlowCell.vue";
import WorkFlowAside from "./cpns/WorkFlowAside.vue";
import WorkFlowOptionAside from "./cpns/WorkFlowOptionAside.vue";
import GenerateBaseTaskFactory from "./cpns/tools/GenerateBaseTaskFactory";

const collapseWidth = ref("20%");

// 提供给弹窗子组件弹窗使用
provide("collapseWidth", collapseWidth);

// 组件展示的顺序及icon配置映射
const collapseConfigMap = [
  { name: "General", icon: "InfoFilled" },
  { name: "ApprovalTask", icon: "Checked" },
  { name: "Actuators", icon: "BellFilled" },
  { name: "Extensions", icon: "CirclePlusFilled" },
  { name: "Notation", icon: "Promotion" },
  { name: "Other", icon: "Paperclip" },
];

/**
 * 创建审批的映射
 */
const createApproval = (_approval) => {
  // 实例化组件键名排序
  const keys = unionSort(
    collapseConfigMap.map((v) => v.name),
    forOwn(_approval)
  );
  if (!isNil(keys)) {
    return keys.reduce((r, k) => {
      const _t = {};
      const icon = collapseConfigMap.find(
        (item) => item.name.toLowerCase() === k.toLowerCase()
      );
      // 设置图标
      if (!isNil(icon)) _t.icon = { ...icon };
      // 设置值
      _t.data = _approval[k];
      r[k] = _t;
      return r;
    }, {});
  }
  return {};
};

const approval = ref(
  createApproval(GenerateBaseTaskFactory.generateTask(CONTANT.GENERAL_TASK))
);

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
    ? changeCollapseWidth("56%")
    : setTimeout(() => {
        changeCollapseWidth("20%");
      }, 300);
};

const clickTaskHandle = (_approval) => {
  // 整体更新实例对象,业务需求
  approval.value = createApproval(_approval);
  // 设置伸缩框
  console.log("approval: =>", approval.value);

  changeCollapseHandle(false);
};

const hadelClick = () => {
  console.log("click: =>", approval.value);
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
