<template>
  <div class="vue-container">
    <div class="graph-container" ref="graphContainerRef"></div>
    <TeleportContainer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Graph } from "@antv/x6";
import { register, getTeleport } from "@antv/x6-vue-shape";
import ProcessVue from "./ProcessVue.vue";

const graphContainerRef = ref(null);
const graphInstance = ref(null);

const TeleportContainer = getTeleport();

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

    // 限制子元素在范围内移动
    translating: {
      restrict(view) {
        if (view) {
          // 获取cell对象
          const cell = view.cell;
          // 判断cell是否是node节点对象
          if (cell.isNode()) {
            // 获取父级元素
            const parent = cell.parent;
            if (parent) {
              return parent.getBBox();
            }
          }
        }

        return null;
      },
    },

    // 绑定其它元素
    embedding: {
      enabled: true,
      findParent({ node }) {
        // 内部的this指向Graph的实例对象
        // 获取移动的矩形对象
        const rectangle = node.getBBox();
        // 返回指定的父节点
        return this.getNodes().filter((n) => {
          // 获取节点中的数据对象
          const data = n.getData();
          // 如果存在数据对象且数据对象内部中存在parent属性
          if (data && data.parent2) {
            // 获取父节点的矩形对象
            const parentRectangle = n.getBBox();
            // 计算两个矩形是否存在交集
            return rectangle.intersectsWithRect(parentRectangle);
          }
          return false;
        });
      },
    },
  });

  // 注册节点
  register({
    shape: "custom-process-node",
    width: 100,
    height: 100,
    component: ProcessVue,
  });

  // 添加节点
  const processNode = graphInstance.value.addNode({
    id: "process-node",
    shape: "custom-process-node",
    x: 100,
    y: 60,
    data: {
      percentage: 0,
    },
  });

  // 每秒自动增加进度条
  // setInterval(() => {
  //   const { percentage } = processNode.getData();
  //   // 更新节点数据
  //   processNode.setData({
  //     percentage: (percentage + 10) % 100,
  //   });
  // }, 2000);

  // 内容居中显示
  graphInstance.value.centerContent();
});
</script>

<style></style>
