<template>
  <GeneralFormBuilder />
  <el-button type="primary" @click="handle">111</el-button>
</template>

<script setup>
import { ref, watch, computed, h, toRaw, onMounted } from "vue";
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

// 定义props组件
defineProps({ approval: Object });

const emits = defineEmits(["update:approvalTask"]);

// 创建动态组件
const GeneralFormBuilder = ref();
// 定义表单数据对象
const approvalTaskFormData = ref({
  // 审批类型
  approvalType: CONTANT.JOB_MANUAL_APPROVAL,
  // 审批人
  approvalHuman: CONTANT.APPROVAL_NOMINATOR,
  // 处理用户
  handlePerson: undefined,
  // 主管
  approvalManager: undefined,
  // 候选人
  approvalCandidatePerson: undefined,
  // 候选角色
  approvalCandidateRole: undefined,
  // 表单管理员
  approvalFormAdmin: undefined,
  // 表单角色
  approvalFormRule: undefined,
  // 审批方式
  approvalMode: "或签",
  // 审批人为空
  nonApproval: "自动通过",
  // 指定审批人
  nonApprovalHuman: undefined,
  // 打回流程
  repluse: "否",
});
// 定义表单的校验规则
const approvalTaskFormRules = ref(TASK_FORM_RULES);

// 重置垃圾状态
const resetApprovalField = (names) => {
  if (isNil(names) || arrayIsEmpty(names)) return;
  approvalTaskFormData.value = {
    ...approvalTaskFormData.value,
    ...names.map((name) => ({ [name]: undefined })),
  };
};

// 获取表单配置数据对象
const acquireApprovalTaskFormItems = () => {
  // 返回计算属性的结果
  return computed(() => {
    // 组件部署
    const deploys = TASK_FORM_ITEMS.reduce((r, c) => {
      const deploy = cloneDeep(c);
      // 处理表单组件的更新与显示,但未更新当前组件绑定的状态
      if (isFunction(deploy.hidden)) {
        deploy.hidden = deploy.hidden({
          approvalType: approvalTaskFormData.value.approvalType,
          approvalHuman: approvalTaskFormData.value.approvalHuman,
          nonApproval: approvalTaskFormData.value.nonApproval,
        });
      }
      r.push(deploy);
      return r;
    }, []);
    // 不能在这里重置状态,思路不对

    // 重置组件中某些垃圾状态
    // resetApprovalField(
    //   deploys.filter((deploy) => deploy.hidden).map((deploy) => deploy.name)
    // );
    return deploys;
  });
};

// 定义表单的配置对象
const aprrovalTaskFormItems = acquireApprovalTaskFormItems();

// 初始化动态组件
GeneralFormBuilder.value = useFormBuilder({
  formItems: aprrovalTaskFormItems,
  formRules: approvalTaskFormRules,
  modelValue: approvalTaskFormData,
  formLabelWidth: "120px",
}).FormBuilder;

const handle = () => {
  console.log("al: =>", approvalTaskFormData.value);
};
</script>

<style></style>
