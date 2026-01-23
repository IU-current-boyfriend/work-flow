<template>
  <el-form
    ref="formInstance"
    label-width="60px"
    :model="formData"
    :rules="formRules"
  >
    <el-form-item
      v-for="formItem of formClause"
      :key="formItem.name"
      :label="formItem.label"
      :prop="formItem.name"
      label-position="right"
    >
      <!-- 动态组件 -->
      <component
        :is="acquireType(formItem.type)"
        v-model="formData[formItem.name]"
        v-bind="formItem.props"
      >
        <!-- 插槽 -->
        <template
          v-for="slot of acquireSlots(formItem.slots)"
          :key="slot"
          #[slot]
        >
          <!-- 插槽内容 -->
          <component :is="formItem.slots[slot]" />
        </template>
      </component>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, useTemplateRef } from "vue";
import { isNil } from "./tools/utils";

// 创建form表单对象ref对象
const formInstance = useTemplateRef("formInstance");

// 定义双向绑定的formData对象
const formData = defineModel();
// 定义props数据
const formProps = defineProps({
  formRules: Object,
  formItems: Array,
});

/**
 * 过滤不需要显示的组件
 */
const formClause = computed(() => {
  return formProps.formItems.filter((item) => !item.hidden);
});

/**
 * 处理插槽属性
 */
const acquireSlots = (slots) => {
  if (isNil(slots)) return [];
  return slots.names;
};

/**
 * 处理类型属性
 */
const acquireType = (type) => {
  // 可以传递function形式
  if (typeof type === "function") return type();
  return type;
};

// 暴露出来方法
defineExpose({
  validate: (...args) => {
    return formInstance.value.validate(...args);
  },
  resetField: () => {
    return formInstance.value.resetField();
  },
});
</script>
