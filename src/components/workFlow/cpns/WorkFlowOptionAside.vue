<template></template>

<script setup>
/**
 * 该组件的问题：
 *    组件上绑定的值是数据实例对象上的值,那就是组件上绑定的值只是数据实例对象上的属性即可
 *    组件触发的方法自定义事件，交给外界处理: 纯组件
 */
import { watch, onMounted, defineComponent, h } from "vue";
import { isNil, forOwn, unionSort } from "./tools/utils";
import ComponentDynamicGenerator from "./tools/ComponentDynamicGenerator";

// props实例对象
const propsInstance = defineProps({
  instance: {
    type: Object,
    default: () => ({}),
    // 常规属性
    general: {
      required: true,
      type: Object,
      id: String,
      mark: String,
      name: String,
    },
    // 抄送提醒对象
    notation: {
      type: Object,
    },
    // 任务对象
    approvalTask: {
      type: Object,
    },
    // 监听器
    actuators: {
      type: Array,
      required: true,
    },
    // 扩展属性
    extensions: {
      type: Array,
      required: true,
    },
    // 其它
    other: {
      type: Object,
      required: true,
      elementDocument: String,
    },
  },
});

// 组件展示的正确顺序
const orderConfirm = [
  "general",
  "approvalTask",
  "actuators",
  "extensions",
  "notation",
  "other",
];

// 定义组件需要绑定的值对象v-model那种需要绑定的值,这个对象根据propsInstance来，因为数据实例对象不同，对应的属性也不同
const initViewModel = (instance = null) => {
  // 实例化组件键名排序
  const keys = unionSort(orderConfirm, forOwn(instance));
  if (!isNil(keys)) {
    /**
     *
     * key代表当前实例对象可以渲染哪些组件
     * instance代表组件中的内容
     *
     * key是组件名
     * instance组件内部的属性和方法等
     * 结合key ==> instance之间关系，转换为关于组件的props数据对象 => 交给动态组件 => 动态组件内部根据props渲染视图、处理事件监听
     * 动态组件的事件处理函数要向外触发事件，统一由源头组件进行实例对象的set函数调用，中间的组件都是侨接组件;
     *
     *
     *
     *
     */
    const componentDynamicGenerator = new ComponentDynamicGenerator(
      keys,
      instance
    );
    console.log("ComponentDynamicGenerator: =>", componentDynamicGenerator);
  }
};

onMounted(() => {
  initViewModel(propsInstance.instance);
});

/**
 * 不支持局部修改，整体修改符合业务逻辑
 */
watch(
  () => propsInstance.instance,
  (newPropsInstance) => {
    // 获取到修改后的属性实例对象,渲染视图
    initViewModel(newPropsInstance);
  }
);
</script>

<style scoped>
.options-container {
  padding: 15px;
}
</style>
