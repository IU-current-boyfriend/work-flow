<template>
  <div class="approval-collapse">
    <el-collapse v-model="collapseActive" @change="changeCollapseHandle">
      <el-collapse-item
        v-for="({ config: approval, option: params }, index) of approvals"
        :key="index"
        :name="approval.name"
      >
        <template #title>
          <div class="collapse-item-title">
            <el-icon :size="20"><component :is="approval.icon" /></el-icon>
            <span class="title">{{ approval.name }}</span>
          </div>
        </template>
        <!--  动态组件 -->
        <component
          :is="approval.name"
          :approval="params"
          @update:approvalTask="updateApprovalTask"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
/**
 * 该组件的问题：
 *    组件上绑定的值是数据实例对象上的值,那就是组件上绑定的值只是数据实例对象上的属性即可
 *    组件触发的方法自定义事件，交给外界处理: 纯组件
 */
import { watch, onMounted, ref, reactive } from "vue";
import { arrayIsEmpty, isNil, forOwn, unionSort } from "./tools/utils";

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

// 自定义事件
const emits = defineEmits([
  "update:approvalTask",
  "update:changeCollapseHandle",
]);

// 定义动态组件名和配置项映射
const approvals = ref(null);

// 伸缩组件当前激活的状态
const collapseActive = ref([]);

// 组件展示的顺序及icon配置映射
const collapseConfigMap = [
  { name: "General", icon: "InfoFilled" },
  { name: "ApprovalTask", icon: "Checked" },
  { name: "Actuators", icon: "BellFilled" },
  { name: "Extensions", icon: "CirclePlusFilled" },
  { name: "Notation", icon: "Promotion" },
  { name: "Other", icon: "Paperclip" },
];

// 定义组件需要绑定的值对象v-model那种需要绑定的值,这个对象根据propsInstance来，因为数据实例对象不同，对应的属性也不同
const initViewModel = (instance = null) => {
  // 实例化组件键名排序
  const keys = unionSort(
    collapseConfigMap.map((v) => v.name),
    forOwn(instance)
  );
  if (!isNil(keys)) {
    /**
     * 组件名和组件配置形成映射
     * general => icon => InfoFilled
     * approvalTask => icon => Checked
     * actuators => icon => BellFilled
     * extensions => icon => CirclePlusFilled
     * notation => icon => Promotion
     * other => icon => Paperclip
     */
    approvals.value = keys.reduce((r, k) => {
      if (!isNil(instance[k])) {
        // 创建临时对象
        const t = Object.create(null);
        // 设置选项数据
        t.option = instance[k];
        // 设置配置数据
        const config = collapseConfigMap.find(
          (c) => c.name.toLocaleUpperCase() === k.toLocaleUpperCase()
        );
        if (!isNil(config)) t.config = config;
        // 设置最终的结果对象
        r.push(t);
      }
      return r;
    }, []);
  }
};

/**
 * 重置伸缩组件当前激活的状态
 */
const initCollapseActive = () => {
  collapseActive.value = [];
};

// 伸缩组件状态变化
const changeCollapseHandle = (val) => {
  emits("update:changeCollapseHandle", arrayIsEmpty(val) ? false : true);
};

const updateApprovalTask = (approvalTask) => {
  emits("update:approvalTask", approvalTask);
};

onMounted(() => {
  // 初始化视图
  initViewModel(propsInstance.instance);
  // 初始化组件的状态
  initCollapseActive();
});

/**
 * 不支持局部修改，整体修改符合业务逻辑
 */
watch(
  () => propsInstance.instance,
  (newPropsInstance) => {
    // 获取到修改后的属性实例对象,渲染视图
    initViewModel(newPropsInstance);
    // 初始化组件状态
    initCollapseActive();
  }
);
</script>

<style scoped>
.options-container {
  padding: 15px;
}
.collapse-item-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.collapse-item-title .title {
  margin-left: 10px;
}
.approval-collapse :deep(.el-collapse) {
  border-top: 1px solid transparent;
}
.approval-collapse :deep(.el-collapse-item__content) {
  padding-bottom: 0px;
}
</style>
