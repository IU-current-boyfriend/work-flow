<template>
  <div class="approval-element"><ApprovalOtherFormBuilder /></div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFormBuilder } from "./tools/useFormBuilder";
import { APPROVAL_OTHER_ITEMS } from "./tools/formDeploy";
// 定义审批其它的表单数据对象
const otherFormModel = defineModel("other");
// 定义审批其它的表单结构
const otherFormItems = computed(() => APPROVAL_OTHER_ITEMS);
// 定义动态表单对象
const useFormBuilderInstance = useFormBuilder({
  formItems: otherFormItems,
  formRules: [],
  modelValue: otherFormModel,
  formLabelWidth: "70px",
});
// 定义审批动态表单的实例对象
const ApprovalOtherFormBuilder = ref(useFormBuilderInstance.FormBuilder);
</script>

<style scoped>
.approval-element {
  padding: 8px 16px;
}
</style>
