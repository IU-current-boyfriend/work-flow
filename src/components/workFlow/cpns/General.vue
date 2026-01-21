<template>
  <div class="general">
    <el-form :model="general" label-width="auto" label-position="right">
      <el-form-item
        v-for="(v, k) in general"
        :key="k"
        :label="k.toLocaleUpperCase()"
        label-position="right"
      >
        <el-input :disabled="k === 'id'" v-model="general[k]" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { cloneDeep } from "../cpns/tools/utils";
import { ref, toRaw, watch, onMounted } from "vue";

// 定义General审批组件中的props
const approvalProps = defineProps({
  approval: {
    type: Object,
    default: () => ({}),
  },
});

// 定义General组件中的模版数据对象
const general = ref({});

// 获取General组件当前的模版数据对象
const getGeneralFormData = () => toRaw(general);

// 初始化视图方法
const initGeneralView = (approval = null) => {
  // 将外界参数拷贝复制给general组件模版数据对象
  general.value = cloneDeep(approval);
};

/**
 * 组件挂载
 */
onMounted(() => {
  initGeneralView(approvalProps.approval);
});

/**
 * 监听外界参数属性的变化
 */
watch(
  () => approvalProps.approval,
  (approval) => {
    initGeneralView(approval);
  }
);

// 向外提供方法
defineExpose({
  getGeneralFormData,
});
</script>

<style scoped>
.general {
  padding: 8px 16px;
}
</style>
