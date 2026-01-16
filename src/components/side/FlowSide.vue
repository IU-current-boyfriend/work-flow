<template>
  <div class="container">
    <div ref="nodeRef"></div>
  </div>
</template>

<script setup>
import { Graph } from "@antv/x6";
import { ref, onMounted } from "vue";
const nodeRef = ref(null);
onMounted(() => {
  // 创建容器
  const graph = new Graph({
    container: nodeRef.value,
    height: 400,
    background: { color: "#F2F7FA" },
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
  });

  const nodes = [
    {
      id: "rect1",
      shape: "rect",
      x: 0,
      y: 0,
      width: 60,
      height: 40,
      label: "开始",
    },
    {
      id: "rect2",
      shape: "rect",
      x: 100,
      y: 100,
      width: 60,
      height: 40,
      label: "结束",
    },
  ];

  nodes.forEach((node) => {
    const appendNode = graph.addNode(node);
    console.log("appendNode: =>", appendNode.prop());
  });

  graph.addEdge({
    source: "rect1",
    target: "rect2",
    vertices: [
      // 途经点，有点类似中转站
      // { x: 0, y: 100 },
      // { x: 50, y: 50 },
    ],
    router: {
      name: "orth",
    },
    connector: {
      name: "rounded",
      args: {},
    },
  });

  // 居中显示
  graph.centerContent();
});
</script>
