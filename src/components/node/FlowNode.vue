<template>
  <div class="container">
    <div ref="nodeRef"></div>
    <button @click="moveHandle">点击移动位置</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Graph } from "@antv/x6";
// 创建nodeRef节点
const nodeRef = ref(null);
const appendNode = ref(null);

const moveHandle = () => {
  // 点击移动位置
  appendNode.value.prop("position", { x: 200, y: 40 });
};

onMounted(() => {
  // 创建容器
  const graph = new Graph({
    container: nodeRef.value,
    height: 600,
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

  // 创建一个五角星的节点,实际上就是svg封装
  const pentagram = {
    shape: "polygon",
    x: 100,
    y: 40,
    width: 40,
    height: 40,
    points: "20,0 10,50 35,20 5,20 30,50 ",
    fill: "#fff",
    stroke: "#8f8f8f",
    strokeWidth: 1,
  };

  // 创建一个矩形节点
  const rectNode = {
    shape: "rect",
    x: 100,
    y: 40,
    width: 100,
    height: 40,
  };

  // 添加节点
  appendNode.value = graph.addNode(pentagram);

  // 居中显示
  graph.centerContent();
});
</script>

<style></style>
