<template>
  <!-- 
    1. 封装antv画布基础配置、只控制画布组件的配置,传入不同的配置,产生不同的画布组件 
    2. 必须作为一个纯函数
  -->
  <div class="graph-cell" ref="graphDomRef"></div>
</template>

<script setup>
import { ref, onMounted, inject, watch, watchEffect, nextTick } from "vue";
import { Graph } from "@antv/x6";
import { merge } from "./tools/utils";

// ✅ 变量命名优化：语义清晰，避免混淆
const x6GraphInstance = ref(null); // 存储X6的画布实例对象
const graphDomRef = ref(null); // 存储画布的DOM容器ref
const graphOption = ref({}); // 画布最终合并后的配置项，初始值为空对象
const isUpdating = ref(false); // 防重复更新锁：避免并发调用导致实例堆积

// 创建画布的外部配置属性,实际上就跟着antv容器api来
const graphCanvasProps = defineProps({
  graphInstanceProps: {
    type: Object,
    default: () => ({}),
    // 画布的属性
    width: Number,
    height: Number,
    scaling: { type: Object, default: () => ({ min: 0.2, max: 2 }) },
    autoResize: Boolean,
    panning: Boolean,
    grid: [Boolean, Object], // ✅ 正确的多类型定义
    mousewheel: Boolean,
    background: [Boolean, Object],
    translating: Object,
    embedding: [Boolean, Object],
    connecting: Object,
    highlighting: Object,
    interacting: Object,
  },
});

// 创建默认网格配置参数
const getDefaultGraphConfig = () => {
  // 创建默认网格配置项
  const defaultGrid = {
    visible: true,
    type: "doubleMesh",
    args: [
      {
        color: "#eee", // 主网格线颜色
        thickness: 1, // 主网格线宽度
      },
      {
        color: "#ddd", // 次网格线颜色
        thickness: 1, // 次网格线宽度
        factor: 4, // 主次网格线间隔
      },
    ],
  };
  return {
    // 画布网格配置项
    grid: defaultGrid,
    // 默认画布颜色
    background: {
      color: "#F2F7FA",
    },
  };
};

// 合并画布的配置项
const mergeGraphOption = (option = null) => {
  return merge(getDefaultGraphConfig(), option);
};

// 初始化画布容器,因为获取的是DOM元素,在组件挂载之前获取不到真实DOM引用
const initContainerEl = (option = {}) => {
  return {
    ...option,
    container: graphDomRef.value,
  };
};

// ✅ 新增【核心】AntV X6 安全销毁实例（官方方案，根治cloneNode报错+内存泄漏）
const destroyX6Graph = () => {
  if (x6GraphInstance.value) {
    // 1. 清空画布容器DOM → X6所有实例/DOM/事件都会被销毁
    graphDomRef.value.innerHTML = "";
    // 2. 解除实例引用，让浏览器垃圾回收释放内存
    x6GraphInstance.value = null;
  }
};

// 更新画布容器的option
const updateGraphOption = (option = null) => {
  graphOption.value = mergeGraphOption(option);
};

// 初始化画布
const createGraph = () => {
  // 先销毁旧的实例 -> 创建新的实例
  destroyX6Graph();
  // 初始化画布实例对象
  const finalOption = initContainerEl(graphOption.value);
  // 创建新的x6实例
  x6GraphInstance.value = new Graph(finalOption);
};

// 初始化容器
const initGraph = (option = {}) => {
  if (isUpdating.value) return; // 防重复执行
  isUpdating.value = true;
  try {
    // ✅ 修复：正确的执行顺序 → 合并配置 → 创建实例
    updateGraphOption(option || graphCanvasProps.graphInstanceProps);
    createGraph();
  } finally {
    isUpdating.value = false;
  }
};

// 组件挂载
onMounted(async () => {
  await nextTick(); // 确保DOM渲染完成，ref拿到真实DOM
  initGraph();
});

// 监听画布的属性变化,change -> update -> option
// 实际上这种思路有问题,在设计的时候,antv提供了api去修改画布、网格等配置的接口
// 在设计的原型图的时候,不应该整体更新画布的配置,应该局部修改
watch(graphCanvasProps.graphInstanceProps, (newVal) => {
  initGraph(newVal);
});

// 暴露x6实例
defineExpose({
  x6GraphInstance,
});
</script>

<style scoped>
.graph-cell {
  /* 画布容器默认与父元素容器相同 */
  width: 100%;
  height: 100%;
}
</style>
