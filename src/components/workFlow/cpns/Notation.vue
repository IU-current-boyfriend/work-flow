<template>
  <div class="approval-notation">
    <ApprovalNotationFormBuilder />
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from "vue";
import { useFormBuilder } from "./tools/useFormBuilder";
import { APPROVAL_NOTATION_ITEMS } from "./tools/formDeploy";

// 定义抄送的表单数据对象
const notationFormModel = defineModel("notation");

// 定义抄送表单数据结构
const approvalNotationItems = computed(() => APPROVAL_NOTATION_ITEMS);

// 创建表单组件
const useFormBuilderInstance = useFormBuilder({
  formItems: approvalNotationItems,
  formRules: [],
  modelValue: notationFormModel,
  formLabelWidth: "80px",
});

// 定义表单组件实例对象
const ApprovalNotationFormBuilder = ref(useFormBuilderInstance.FormBuilder);
</script>

<style secoped>
.approval-notation {
  padding: 8px 16px;
}
</style>
