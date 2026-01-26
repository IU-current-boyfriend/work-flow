// 任务表单校验规则,全部字段
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
