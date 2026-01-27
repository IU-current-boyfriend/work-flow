import { h, ref, reactive, watch, computed } from "vue";
import FormBuilder from "../FormBuilder.vue";
const useFormBuilder = (props) => {
  // TypeError: Cannot read properties of undefined (reading 'filter')
  // formItems is refImpl 未解包
  const formRef = ref();
  const validate = (...args) => {
    return formRef.value?.validate(...args);
  };
  const resetFields = (...args) => {
    return formRef.value?.resetFields(...args);
  };
  // 表单校验函数
  const Component = (_, { slots }) => {
    return h(FormBuilder, { ...reactive(props), ref: formRef }, slots);
  };
  return {
    validate,
    resetFields,
    FormBuilder: Component,
  };
};

export { useFormBuilder };
