<template>
  <div class="approval-task">
    <ApprovalTaskFormBuilder />
  </div>
</template>

<script setup>
import { ref, watch, computed, h, reactive } from "vue";
import {
  isNil,
  keys,
  isFunction,
  cloneDeep,
  arrayIsEmpty,
} from "./tools/utils";
import { useFormBuilder } from "./tools/useFormBuilder";
import { TASK_FORM_ITEMS } from "./tools/formDeploy";
import { TASK_FORM_RULES } from "./tools/rules";
import * as CONTANT from "./tools/contant";

// 重置垃圾状态
const resetApprovalField = (names) => {
  if (isNil(names) || arrayIsEmpty(names)) return;
  // 重置表单字段
  names.forEach((name) => (approvalTaskFormModel.value[name] = undefined));
};
// 创建审批任务动态表单实例对象应用
const ApprovalTaskFormBuilder = ref();
// 定义审批任务表单数据
const approvalTaskFormModel = defineModel("approvalTask");
// 定义表单的校验规则
const approvalTaskFormRules = ref(TASK_FORM_RULES);
// 定义动态表单组件结构
// 定义表单的配置对象
const aprrovalTaskFormItems = computed(() => {
  // 组件部署
  const deploys = TASK_FORM_ITEMS.reduce((r, c) => {
    const deploy = cloneDeep(c);
    // 处理表单组件的更新与显示,但未更新当前组件绑定的状态
    if (isFunction(deploy.hidden)) {
      deploy.hidden = deploy.hidden({
        approvalType: approvalTaskFormModel.value.approvalType,
        approvalHuman: approvalTaskFormModel.value.approvalHuman,
        nonApproval: approvalTaskFormModel.value.nonApproval,
      });
    }
    r.push(deploy);
    return r;
  }, []);
  // 获取需要重置的表单字段
  const resetFields = keys(approvalTaskFormModel.value).filter(
    (v) =>
      !deploys
        .filter((deploy) => !deploy.hidden)
        .map((deploy) => deploy.name)
        .includes(v)
  );
  // 重置表单字段
  resetApprovalField(resetFields);
  // 返回组件结构
  return deploys;
});

// 创建动态表单
const useFormBuilderInstance = useFormBuilder({
  formItems: aprrovalTaskFormItems,
  formRules: approvalTaskFormRules,
  modelValue: approvalTaskFormModel,
  formLabelWidth: "120px",
});

// 动态表单组件应用赋值
ApprovalTaskFormBuilder.value = useFormBuilderInstance.FormBuilder;
</script>

<style></style>
