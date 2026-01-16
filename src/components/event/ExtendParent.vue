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
const embedPadding = 20;

onMounted(() => {
  Graph.registerNode(
    "custom-group-node",
    {
      inherit: "rect",
      width: 80,
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
    // 表示节点都是嵌入的
    embedding: {
      enabled: true,
    },
  });

  const source = graphInstance.value.addNode({
    id: "source",
    shape: "custom-group-node",
    x: 80,
    y: 100,
    width: 80,
    height: 40,
    label: "source",
    zIndex: 2,
  });

  // const target = graphInstance.value.addNode({
  //   id: "target",
  //   shape: "custom-group-node",
  //   x: 280,
  //   y: 80,
  //   label: "target",
  //   zIndex: 2,
  // });

  const parent = graphInstance.value.addNode({
    id: "parent",
    shape: "custom-group-node",
    x: 40,
    y: 40,
    width: 360,
    height: 160,
    zIndex: 1,
    label: "Parent",
  });

  parent.addChild(source);
  // parent.addChild(target);

  // console.log("parent: =>", parent, source);

  let ctrlPressed = false;

  // 寻找目标节点的过程中事件,用户按了ctrl或者meta键
  graphInstance.value.on("node:embedding", ({ e }) => {
    ctrlPressed = e.ctrlKey || e.metaKey;
  });

  // 节点完成嵌入触发
  graphInstance.value.on("node:embedded", () => {
    ctrlPressed = false;
  });

  graphInstance.value.on("node:change:size", ({ node, options }) => {
    if (options.skipParentHandler) {
      return;
    }

    const children = node.getChildren();
    if (children && children.length) {
      node.prop("originSize", node.getSize());
    }
  });

  graphInstance.value.on("node:change:position", ({ node, options }) => {
    if (options.skipParentHandler || ctrlPressed) {
      return;
    }

    // 移动的是非嵌入元素
    const children = node.getChildren();
    if (children && children.length) {
      node.prop("originPosition", node.getPosition());
    }

    // 移动的是嵌入元素
    const parent = node.getParent();
    // 判断嵌入元素的非嵌入元素是否是节点
    if (parent && parent.isNode()) {
      // 获取非嵌入元素的尺寸、宽和高
      let originSize = parent.prop("originSize");
      // 如果没有获取到，重新获取，并重新设置
      if (originSize == null) {
        originSize = parent.getSize();
        parent.prop("originSize", originSize);
      }
      // 获取非嵌入元素的位置
      let originPosition = parent.prop("originPosition");
      if (originPosition == null) {
        // 重新获取位置，并重新设置
        originPosition = parent.getPosition();
        parent.prop("originPosition", originPosition);
      }

      let x = originPosition.x;
      let y = originPosition.y;

      console.log("x: y", x, y, originSize.width, originSize.height); // 40 40 460 160

      // 嵌入元素移动的坐标
      let cornerX = originPosition.x + originSize.width; // 500
      let cornerY = originPosition.y + originSize.height; // 200

      let hasChange = false;

      const children = parent.getChildren();
      if (children) {
        children.forEach((child) => {
          // console.log(
          //   "children: =>",
          //   child.getBBox(),
          //   child.getBBox().inflate(embedPadding) // embedPading -> x -> -embedPading  width -> + 2*embedPading
          // );

          const bbox = child.getBBox().inflate(embedPadding);
          const corner = bbox.getCorner();
          console.log("conrner:=>", child.getBBox(), bbox, corner); // corner就是bbox的右下角坐标

          if (bbox.x < x) {
            x = bbox.x;
            hasChange = true;
          }

          if (bbox.y < y) {
            y = bbox.y;
            hasChange = true;
          }

          if (corner.x > cornerX) {
            console.log("xxx:==xx");

            cornerX = corner.x;
            hasChange = true;
          }

          if (corner.y > cornerY) {
            cornerY = corner.y;
            hasChange = true;
          }
        });
      }

      if (hasChange) {
        parent.prop(
          {
            position: { x, y },
            size: { width: cornerX - x, height: cornerY - y },
          },
          // Note that we also pass a flag so that we know we shouldn't
          // adjust the `originPosition` and `originSize` in our handlers.
          { skipParentHandler: true }
        );
      }
    }
  });

  graphInstance.value.centerContent();
});
</script>

<style></style>
