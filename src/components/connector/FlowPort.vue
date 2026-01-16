<template>
  <div class="container">
    <div ref="portRef"></div>
    <button>addPort</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Graph } from "@antv/x6";
const portRef = ref(null);

onMounted(() => {
  // 创建容器
  const graph = new Graph({
    container: portRef.value,
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
  // 注册自定义节点
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
  // 添加两个节点
  const origin = graph.addNode({
    id: "1",
    shape: "custom-node-with-port",
    x: 40,
    y: 40,
    label: "hello",
    // 定义连接桩
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
  const target = graph.addNode({
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

  const needAddPortNode = graph.getCellById("1");
  const ports = needAddPortNode.getPorts();
  needAddPortNode.addPort({
    id: "port_3",
    group: "top",
    attrs: {
      text: {
        text: `${ports.length + 1}`,
      },
    },
  });
  const newPorts = needAddPortNode.getPorts();

  needAddPortNode.portProp("port_1", "attrs/circle/stroke", "red");

  // 创建边
  graph.addEdge({
    source: { cell: origin, port: "port_1" },
    target: { cell: target, port: "port_4" },
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
  // 导出json
  const json = graph.toJSON();
  console.log("json: =>", JSON.stringify(json));
});
</script>

<style></style>
