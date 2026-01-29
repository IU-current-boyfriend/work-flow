<template>
  <div class="work-flow-cell">
    <el-container class="cell-container">
      <el-aside class="cell-aside">
        <WorkFlowAside @cellDragstartEvent="cellDragstartEventHandle" />
      </el-aside>
      <el-main class="cell-main">
        <WorkFlowCell ref="x6GraphInstanceRef" />
      </el-main>
      <el-aside class="cell-aside-option" :width="collapseWidth">
        <WorkFlowOptionAside
          v-model:approval="approval"
          @update:changeCollapseHandle="changeCollapseHandle"
        />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { nextTick, provide, ref, useTemplateRef, watch } from "vue";
import {
  arrayIsEmpty,
  isNil,
  forOwn,
  unionSort,
  throttle,
} from "./cpns/tools/utils";
import * as CONTANT from "./cpns/tools/contant";
import WorkFlowCell from "./cpns/WorkFlowCell.vue";
import WorkFlowAside from "./cpns/WorkFlowAside.vue";
import WorkFlowOptionAside from "./cpns/WorkFlowOptionAside.vue";
import GenerateBaseTaskFactory from "./cpns/tools/GenerateBaseTaskFactory";

const collapseWidth = ref("20%");

// 定义画布对象
const x6GraphInstance = ref(null);
// 定义画布插件dnd实例对象
const x6GraphDndInstance = ref(null);
// 定义画布插件组件实例对象
const x6GraphInstanceRef = useTemplateRef("x6GraphInstanceRef");

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

/**
 * 创建拖拽后的节点
 */
const createGraphNode = (e, callback) => {
  const node = x6GraphInstance.value.createNode({
    data: {
      dragendFn: callback,
    },
    width: 120,
    height: 100,
    attrs: {
      body: {
        stroke: "#787be8",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });
  // 开启拖拽插件
  x6GraphDndInstance.value.start(node, e);
};

/**
 * 初始化相关画布的实例对象
 */
const initGraphInstances = () => {
  x6GraphInstance.value = x6GraphInstanceRef.value.x6GraphInstance;
  x6GraphDndInstance.value = x6GraphInstanceRef.value.x6GraphDndInstance;
};

/**
 * 鼠标按下事件
 */
const cellDragstartEventHandle = (e, _approval) => {
  initGraphInstances();
  createGraphNode(e, () => {
    changeCollapseHandle(false);
    approval.value = createApproval(_approval);
  });
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
