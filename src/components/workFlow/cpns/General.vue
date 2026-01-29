<template>
  <div class="approval-general">
    <GeneralFormBuilder />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { keys } from "../cpns/tools/utils";
import { useFormBuilder } from "./tools/useFormBuilder";
import { APPROVAL_GENERAL_ITEMS } from "./tools/formDeploy";

/**
 * 定义General表单数据
 */
const generalFormModel = defineModel("general");

/**
 * 定义General表单结构
 */
const generalFormItems = computed(() => {
  return APPROVAL_GENERAL_ITEMS.filter((item) =>
    keys(generalFormModel.value).includes(item.name)
  );
});
/**
 * 定义动态表单的实例对象
 */
const useFormBuilderInstance = useFormBuilder({
  formRules: [],
  formItems: generalFormItems,
  modelValue: generalFormModel,
  formLabelWidth: "80px",
});

// 定义动态表单实例对象
const GeneralFormBuilder = ref(useFormBuilderInstance.FormBuilder);
</script>

<style scoped>
.general {
  padding: 8px 16px;
}
</style>
