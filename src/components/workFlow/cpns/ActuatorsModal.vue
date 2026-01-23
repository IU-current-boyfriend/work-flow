<template>
  <div class="actuators-modal">
    <el-drawer v-model="drawer" title="Execute Actuators" :size="collapseWidth">
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

// 定义外界监听器的属性集合
const actuatorsProps = defineProps({
  actuator: {
    type: Object,
    default: () => ({}),
  },
});

const collapseWidth = inject("collapseWidth");

// 定义组件中监听器对象
const actuator = ref({});

// 定义抽屉组件状态
const drawer = ref(false);

// 编辑字段注入
const actuactorFieldEditHandle = () => {};

// 删除字段注入
const actuactorFieldDeleteHandle = () => {};

// 设置抽屉组件的状态方法
const setDrawerCondition = (bol) => (drawer.value = bol);

/**
 * 开启抽屉组件
 */
const openDrawer = () => setDrawerCondition(true);

/**
 * 关闭抽屉组件
 */
const closeDrawer = () => setDrawerCondition(false);

defineExpose({
  openDrawer,
  closeDrawer,
});
</script>

<style scoped>
.actuators-modal :deep(.el-drawer__header) {
  padding: var(--el-drawer-padding-primary);
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}
.actuators-modal .actuator-main {
  padding: 10px 0 30px 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
}

.actuator-field .field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.actuator-field .header-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.actuator-field .header-left .icon {
  margin-right: 10px;
}
.actuator-field .add-field-btn {
  padding: 0 20px;
}
</style>
