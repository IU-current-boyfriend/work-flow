<template>
  <div class="approval-general">
    <GeneralFormBuilder />
  </div>
</template>

<script setup>
import { useFormBuilder } from "./tools/useFormBuilder";
import { isNil, cloneDeep, unionSort, keys } from "../cpns/tools/utils";
import { h, ref, toRaw, watch, onMounted, computed } from "vue";

// 获取general组件中的formData对象
function acquireGeneralFormData(approval = null) {
  if (isNil(approval)) return cloneDeep(defineGeneralProps.approval);
  return cloneDeep(approval);
}

// 获取general组件中的校验规则对象
function acquireGeneralFormRules(approval = null) {
  const approvalGeneral = isNil(approval)
    ? defineGeneralProps.approval
    : approval;
  // 定义该组件表单所有校验规则
  const rules = {
    id: [{ required: true, message: "id is required", trigger: "blur" }],
    name: [{ required: true, message: "label is required", trigger: "blur" }],
    mark: [{ required: true, message: "mark is required", trigger: "blur" }],
  };
  return Object.entries(rules).reduce((r, [k, v]) => {
    if (keys(approvalGeneral).includes(k)) r[k] = v;
    return r;
  }, {});
}

// 获取表单配置数据对象
function acquireGeneralFormItems(approval = null) {
  return computed(() => {
    const approvalGeneral = isNil(approval)
      ? defineGeneralProps.approval
      : approval;
    // 所有表单数据
    const items = [
      {
        name: "id", // 数据标识符
        type: "el-input", // 组件类型
        label: "ID", // 标签
        props: {
          // 属性对象
          disabled: true,
        },
      },
      {
        name: "name", // 数据标识符
        type: "el-input", // 组件类型
        label: "名称", // 标签
        props: {
          placeholder: "Please input",
        },
      },
      {
        name: "mark", // 数据标识符
        type: "el-input", // 组件类型
        label: "标签", // 标签
        hidden: isNil(approvalGeneralFormData.value.name),
        props: {
          // 属性对象
          clearable: true,
          placeholder: "Please input",
        },
      },
    ];
    return items.filter((item) => keys(approvalGeneral).includes(item.name));
  });
}

// 定义General审批组件中的props
const defineGeneralProps = defineProps({
  approval: {
    type: Object,
    default: () => ({}),
  },
});

// 创建动态组件
const GeneralFormBuilder = ref();

// 表单数据对象
const approvalGeneralFormData = ref(acquireGeneralFormData());

// 表单校验规则
const approvalGeneralFormRules = ref(acquireGeneralFormRules());

// 表单数据对象
const approvalGeneralFormItems = acquireGeneralFormItems();

// 初始化
GeneralFormBuilder.value = useFormBuilder({
  formItems: approvalGeneralFormItems,
  formRules: approvalGeneralFormRules,
  modelValue: approvalGeneralFormData,
}).FormBuilder;

// 更新视图方法
const updateGeneralView = (approval = null) => {
  GeneralFormBuilder.value = useFormBuilder({
    formItems: acquireGeneralFormItems(approval),
    formRules: acquireGeneralFormRules(approval),
    modelValue: acquireGeneralFormData(approval),
  }).FormBuilder;
};

/**
 * 监听外界参数属性的变化
 */
watch(
  () => defineGeneralProps.approval,
  (approval) => {
    updateGeneralView(approval);
  }
);
</script>

<style scoped>
.general {
  padding: 8px 16px;
}
</style>
