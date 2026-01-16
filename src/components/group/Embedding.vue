<template>
  <div class="container">
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
  Graph.registerNode(
    "custom-node",
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
    },
    true
  );

  // 创建节点
  graphInstance.value.addNode({
    id: "child1",
    shape: "custom-node",
    x: 40,
    y: 140,
    width: 120,
    height: 60,
    label: "Child\n(unembed)",
    zIndex: 10,
  });

  graphInstance.value.addNode({
    id: "child2",
    shape: "custom-node",
    x: 500,
    y: 100,
    width: 120,
    height: 60,
    label: "Child\n(unembed)",
    zIndex: 10,
  });

  const parent = graphInstance.value.addNode({
    id: "parent",
    shape: "custom-node",
    x: 200,
    y: 80,
    width: 240,
    height: 160,
    zIndex: 1,
    label: "Parent",
    data: {
      // 节点内部的数据
      parent2: true,
    },
  });

  // 注册节点变化的label变化
  // 这个事件是什么意思呢？
  // 当cell是node节点，且parent属性变化的时候，执行
  graphInstance.value.on("node:change:parent", ({ node }) => {
    if (node.parent) {
      node.attr({
        label: {
          text: "Child\n(embed)",
        },
      });
    } else {
      node.attr({
        label: {
          text: "Child\n(unEmbed)",
        },
      });
    }
  });

  // 内容居中显示
  graphInstance.value.centerContent();
});
</script>

<style></style>
