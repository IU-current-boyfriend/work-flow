import { isNil, isEmptyString } from "./utils";

// 审批任务表单校验规则
export const TASK_FORM_RULES = {
  approvalType: [
    {
      required: true,
      message: "approvalType is required",
      trigger: "change",
    },
  ],
  approvalHuman: [
    {
      required: true,
      message: "approvalHuman is required",
      trigger: "change",
    },
  ],
  handlePerson: [
    { required: true, message: "handlePerson is required", trigger: "change" },
  ],
  approvalManager: [
    {
      required: true,
      message: "approvalManager is required",
      trigger: "change",
    },
  ],
  approvalCandidatePerson: [
    {
      required: true,
      message: "approvalCandidatePerson is required",
      trigger: "change",
    },
  ],
  approvalCandidateRole: [
    {
      required: true,
      message: "approvalCandidateRole is required",
      trigger: "change",
    },
  ],
  approvalMode: [
    {
      required: true,
      message: "approvalMode is required",
      trigger: "change",
    },
  ],
  approvalFormAdmin: [
    {
      required: true,
      message: "approvalFormAdmin is required",
      trigger: "change",
    },
  ],
  approvalFormRule: [
    {
      required: true,
      message: "approvalFormRule is required",
      trigger: "change",
    },
  ],

  nonApproval: [
    {
      required: true,
      message: "nonApproval is required",
      trigger: "change",
    },
  ],

  nonApprovalHuman: [
    {
      required: true,
      message: "nonApprovalHuman is required",
      trigger: "change",
    },
  ],
  repulse: [
    { required: true, message: "repulse is required", trigger: "change" },
  ],
};

// 审批执行器基础表单规则
export const ACTUACTOR_FROM_RULES = {
  // 事件类型
  eventType: [
    { required: true, message: "eventype is required", trigger: "change" },
  ],
  // 选择类
  choseClass: [
    { required: true, message: "class is required", trigger: "change" },
  ],
};

// 审批执行器注入字段规则
export const ACTUACTOR_FIELD_RULES = {
  name: [{ required: true, message: "name is required", trigger: "blur" }],
  type: [{ required: true, message: "type is required", trigger: "change" }],
  express: [
    { required: true, message: "express is required", trigger: "blur" },
  ],
};

// 审批扩展属性校验规则
export const ACTUACTOR_EXTENSION_RULES = {
  name: [{ required: true, message: "name is required", trigger: "blur" }],
  value: [{ required: true, message: "value is required", trigger: "blur" }],
};
