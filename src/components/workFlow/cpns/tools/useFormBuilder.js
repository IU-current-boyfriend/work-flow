import { h, ref, reactive } from "vue";
import FormBuilder from "../FormBuilder.vue";
const useFormBuilder = (props) => {
  // TypeError: Cannot read properties of undefined (reading 'filter')
  // formItems is refImpl 未解包
  const formRef = ref();
  const Component = (_, { slots }) => {
    return h(FormBuilder, { ...reactive(props), ref: formRef }, slots);
  };

  return {
    validate: formRef.value?.validate,
    resetField: formRef.value?.resetField,
    FormBuilder: Component,
  };
};

export { useFormBuilder };
