<template>
  <div class="event-container">
    <div ref="graphContainerRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Graph } from "@antv/x6";
const graphContainerRef = ref(null);
const graphInstance = ref(null);

onMounted(() => {
  // 初始化画布实例对象
  graphInstance.value = new Graph({
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    grid: {
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
    },
    container: graphContainerRef.value,
    background: {
      color: "#F2F7FA",
    },
  });

  // 注册统一的节点
  Graph.registerNode(
    "custom-event-node",
    {
      inherit: "rect", // 继承矩形节点
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6, // rx?是什么
          ry: 6, // ry?是什么
        },
      },
    },
    true
  ); // true是什么意思？

  const source = graphInstance.value.addNode({
    id: "source",
    shape: "custom-event-node",
    x: 40,
    y: 40,
    label: "Source",
  });

  const target = graphInstance.value.addNode({
    id: "target",
    shape: "custom-event-node",
    x: 160,
    y: 240,
    label: "Target",
  });

  // 设置边
  graphInstance.value.addEdge({
    source,
    target,
    vertices: [
      { x: 90, y: 160 },
      { x: 210, y: 160 },
    ],
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

  // 注册事件 当鼠标移入的时候展示工具
  graphInstance.value.on("cell:mouseenter", ({ cell }) => {
    if (cell.isNode()) {
      cell.addTools([
        {
          name: "boundary",
          args: {
            attrs: {
              fill: "#7c68fc",
              stroke: "#333",
              "stroke-width": 1,
              "fill-opacity": 0.2,
            },
          },
        },
        {
          name: "button",
          args: {
            x: 0,
            y: 0,
            offset: { x: 10, y: 10 },
          },
        },
      ]);
    } else {
      // 鼠标移入到线上了
      cell.addTools(["vertices", "segments"]);
    }
  });

  // 鼠标移出的时候
  graphInstance.value.on("cell:mouseleave", ({ cell }) => {
    // 删除标识
    cell.removeTools();
  });

  // 内容居中显示
  graphInstance.value.centerContent();
});
</script>

<style></style>
