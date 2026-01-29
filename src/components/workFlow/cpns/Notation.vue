<template>
  <div class="notation-container">
    <ApprovalNotationFormBuilder />
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from "vue";
import { isNil, cloneDeep } from "./tools/utils";
import { useFormBuilder } from "./tools/useFormBuilder";
import { ACTUACTOR_NOTATION_ITEMS } from "./tools/formDeploy";

// 定义通知属性
const defineNotation = defineProps({
  notation: Object,
});

// 定义抄送提醒数据对象
const approvalNotation = ref({
  start: undefined,
  end: undefined,
});

// 定义抄送表单数据结构
const approvalNotationItems = computed(() => ACTUACTOR_NOTATION_ITEMS);
// 创建表单组件
const useFormBuilderInstance = useFormBuilder({
  formItems: approvalNotationItems,
  formRules: [],
  modelValue: approvalNotation,
  formLabelWidth: "80px",
});

// 定义表单组件实例对象
const ApprovalNotationFormBuilder = ref(useFormBuilderInstance.FormBuilder);

const initApprovalNotation = () => {
  // 设置默认值
  const _notation = isNil(defineNotation.notation)
    ? approvalNotation.value
    : defineNotation.notation;
  // 赋予抄送提醒数据对象值
  approvalNotation.value = cloneDeep(_notation);
};

//
watchEffect(() => initApprovalNotation());
</script>

<style secoped>
.notation-container {
  padding: 8px 16px;
}
</style>
