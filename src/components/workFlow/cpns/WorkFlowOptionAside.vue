<template>
  <div class="approval-collapse">
    <el-collapse v-model="collapseActive" @change="changeCollapseHandle">
      <el-collapse-item v-for="(v, k) in approval" :key="k" :name="k">
        <template #title>
          <div class="collapse-item-title">
            <el-icon :size="20"><component :is="v.icon.icon" /></el-icon>
            <span class="title">{{ v.icon.name }}</span>
          </div>
        </template>
        <!--  动态组件 -->
        <component :is="v.icon.name" v-model:[k]="v.data" />
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
import { ref, computed, watch } from "vue";
import { arrayIsEmpty } from "./tools/utils";

// 自定义事件
const emits = defineEmits(["update:changeCollapseHandle"]);

// 定义双向绑定的参数
const approval = defineModel("approval");

// 伸缩组件当前激活的状态
const collapseActive = ref([]);

/**
 * 重置伸缩组件当前激活的状态
 */
const initCollapseActive = () => (collapseActive.value = []);

// 伸缩组件状态变化
const changeCollapseHandle = (val) => {
  emits("update:changeCollapseHandle", arrayIsEmpty(val) ? false : true);
};

// 重置伸缩栏组件的变化
watch(approval, () => initCollapseActive());
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
