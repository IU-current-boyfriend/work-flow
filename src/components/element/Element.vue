<template>
  <div ref="graphContainerRef"></div>
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
    width: "100%",
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

  Graph.registerNode(
    "custom-node-with-port",
    {
      inherit: "rect",
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
        },
      },
    },
    true
  );
  const source = graphInstance.value.addNode({
    shape: "custom-node-with-port",
    x: 40,
    y: 40,
    label: "hello",
    ports: {
      items: [
        {
          id: "port_1",
          group: "bottom",
        },
        {
          id: "port_2",
          group: "bottom",
        },
      ],
    },
  });

  const target = graphInstance.value.addNode({
    shape: "custom-node-with-port",
    x: 160,
    y: 180,
    label: "world",
    ports: {
      items: [
        {
          id: "port_3",
          group: "top",
        },
        {
          id: "port_4",
          group: "top",
        },
      ],
    },
  });

  graphInstance.value.addEdge({
    source: { cell: source, port: "port_2" },
    target: { cell: target, port: "port_3" },
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

  // 比如说创建一个节点 addNode -> options -> 元素Cell -> options -> render svg
  // graphInstance.value.addNode({
  //   shape: "rect",
  //   width: 100,
  //   height: 40,
  //   label: "123",
  // });

  // 内容居中显示
  graphInstance.value.centerContent();
});
</script>

<style></style>
