import { h } from "vue";
import { isNil } from "./utils";
import * as CONTANT from "./contant";

// 审批常规配置类
export const APPROVAL_GENERAL_ITEMS = [
  {
    name: "id",
    type: "el-input",
    label: "ID",
    props: {
      disabled: true,
    },
  },
  {
    name: "name",
    type: "el-input",
    label: "名称",
    props: {
      placeholder: "Please input",
      clearable: true,
    },
  },
  {
    name: "mark",
    type: "el-input",
    label: "标签",
    props: {
      placeholder: "Please input",
      clearable: true,
    },
  },
];

// 审批任务表单配置类
export const TASK_FORM_ITEMS = [
  {
    name: "approvalType", // 审批类型
    type: "el-radio-group", // 单选按钮组
    label: "审批类型", // 表单的label属性
    slots: {
      names: ["default"],
      // 按钮组中的内容
      default: () =>
        h(
          "div",
          [
            { value: CONTANT.JOB_MANUAL_APPROVAL, label: "人工审批" },
            { value: CONTANT.JOB_AUTOMATIC_CONSENT, label: "自动同意" },
            { value: CONTANT.JOB_AUTOMATIC_REJECT, label: "自动拒绝" },
          ].map((item) => h(ElRadio, item))
        ),
    },
  },
  {
    name: "approvalHuman", // 审批人
    type: "el-radio-group", // 单选按钮组
    label: "审批人",
    // 审批人出现的条件: 审批类型非人工审核=>隐藏
    hidden: ({ approvalType }) => approvalType !== CONTANT.JOB_MANUAL_APPROVAL,
    slots: {
      names: ["default"],
      // 按钮组中的内容
      default: () =>
        h(
          "div",
          [
            { value: CONTANT.APPROVAL_NOMINATOR, label: "指定人" },
            { value: CONTANT.APPROVAL_SELF, label: "发起人自己" },
            { value: CONTANT.APPROVAL_MANAGER, label: "主管" },
            { value: CONTANT.APPROVAL_CANDIDATE, label: "候选人" },
            { value: CONTANT.APPROVAL_CANDIDATE_ROLE, label: "候选角色" },
            { value: CONTANT.APPROVAL_ADMIN, label: "候选表单" },
            { value: CONTANT.APPROVAL_FORM_ROLE, label: "表单角色" },
          ].map((item) => h(ElRadio, item))
        ),
    },
  },
  {
    name: "handlePerson",
    type: "el-cascader",
    label: "处理用户",
    props: {
      placeholder: "Please select",
      props: { multiple: true }, // 可清除
      clearable: true, // 多选
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
    // 必须人工审批且是指定人
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_NOMINATOR
      );
    },
  },
  {
    name: "approvalManager",
    type: "el-select",
    label: "主管",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "Manager-1",
          label: "直属主管",
        },
        {
          value: "Manager-2",
          label: "第2级主管",
        },
        {
          value: "Manager-3",
          label: "第3级主管",
        },
        {
          value: "Manager-4",
          label: "第4级主管",
        },
        {
          value: "Manager-5",
          label: "第5级主管",
        },
      ],
    },
    // 必须是人工审核且是主管
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_MANAGER
      );
    },
  },
  {
    name: "approvalCandidatePerson",
    type: "el-cascader",
    label: "候选用户",
    props: {
      placeholder: "Please select",
      clearable: true, // 可清除
      multiple: true, // 多选
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
    // 必须是人工审核且是候选人
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_CANDIDATE
      );
    },
  },
  {
    name: "approvalCandidateRole",
    type: "el-cascader",
    label: "候选角色",
    props: {
      props: { multiple: true }, // 可清除
      clearable: true, // 多选
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
    // 必须是人工审核且是候选角色
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_CANDIDATE_ROLE
      );
    },
  },
  {
    name: "approvalFormAdmin",
    type: "el-select",
    label: "表单管理员",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "Admin-1",
          label: "表单管理员1",
        },
        {
          value: "Admin-2",
          label: "表单管理员2",
        },
        {
          value: "Admin-3",
          label: "表单管理员3",
        },
        {
          value: "Admin-4",
          label: "表单管理员4",
        },
        {
          value: "Admin-5",
          label: "表单管理员5",
        },
      ],
    },
    // 人工审批且候选人为表单管理员
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_ADMIN
      );
    },
  },
  {
    name: "approvalFormRule",
    type: "el-select",
    label: "表单角色",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "FormRule-1",
          label: "表单角色1",
        },
        {
          value: "FormRule-2",
          label: "表单角色2",
        },
        {
          value: "FormRule-3",
          label: "表单角色3",
        },
        {
          value: "FormRule-4",
          label: "表单角色4",
        },
        {
          value: "FormRule-5",
          label: "表单角色5",
        },
      ],
    },
    // 人工审批且候选人为表单角色
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman !== CONTANT.APPROVAL_FORM_ROLE
      );
    },
  },
  {
    name: "approvalMode", // 审批方式
    type: "el-radio-group", // 单选按钮组
    label: "审批方式", // 表单的label属性
    slots: {
      names: ["default"],
      // 按钮组中的内容
      default: () =>
        h(
          "div",
          [
            { value: "会签", label: "会签（所有人都同意）" },
            { value: "或签", label: "或签（一人同意或拒绝）" },
          ].map((item) => h(ElRadio, item))
        ),
    },
    // 候选人、候选角色、发现人自己不出现
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman === CONTANT.APPROVAL_CANDIDATE ||
        approvalHuman === CONTANT.APPROVAL_CANDIDATE_ROLE ||
        approvalHuman === CONTANT.APPROVAL_SELF
      );
    },
  },
  {
    name: "nonApproval", // 审批类型
    type: "el-radio-group", // 单选按钮组
    label: "审批人为空时", // 表单的label属性
    slots: {
      names: ["default"],
      // 按钮组中的内容
      default: () =>
        h(
          "div",
          [
            { value: "自动通过", label: "自动通过" },
            { value: "自动拒绝", label: "自动拒绝" },
            { value: "指定人员审批", label: "指定人员审批" },
          ].map((item) => h(ElRadio, item))
        ),
    },
    hidden: ({ approvalType, approvalHuman }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman === CONTANT.APPROVAL_SELF
      );
    },
  },
  {
    name: "nonApprovalHuman",
    type: "el-cascader",
    props: {
      placeholder: "Please select",
      clearable: true, // 清除
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
    // 必须人工审批且是指定人
    hidden: ({ approvalType, approvalHuman, nonApproval }) => {
      return (
        approvalType !== CONTANT.JOB_MANUAL_APPROVAL ||
        approvalHuman === CONTANT.APPROVAL_SELF ||
        nonApproval !== "指定人员审批"
      );
    },
  },
  {
    name: "repluse", // 审批类型
    type: "el-radio-group", // 单选按钮组
    label: "打回流程", // 表单的label属性
    slots: {
      names: ["default"],
      // 按钮组中的内容
      default: () =>
        h(
          "div",
          [
            { value: "否", label: "否" },
            { value: "是", label: "是" },
          ].map((item) => h(ElRadio, item))
        ),
    },
  },
];

// 审批执行器基础表单配置类
export const ACTUACTOR_FROM_ITEMS = [
  {
    name: "eventType",
    type: "el-select",
    label: "事件",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "开始",
          label: "开始",
        },
        {
          value: "结束",
          label: "结束",
        },
      ],
    },
  },
  {
    name: "choseClass",
    type: "el-select",
    label: "选择类",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "addons\flowunitlibraryextendelementlistenerStartListener",
          label: "开始监听器",
        },
        {
          value: "addons\flowunitlibraryextendelementlistenerEndListener",
          label: "结束监听器",
        },
      ],
    },
  },
  {
    name: "choseClass",
    type: "el-input",
    label: "类",
    props: {
      clearable: true,
    },
  },
];

// 审批执行器注入字段配置类
export const ACTUACTOR_FIELD_ITEMS = [
  {
    name: "name",
    type: "el-input",
    label: "字段名称",
  },
  {
    name: "type",
    type: "el-select",
    label: "字段类型",
    props: {
      placeholder: "Please select",
      options: [
        {
          value: "字符串",
          label: "字符串",
        },
      ],
    },
  },
  {
    name: "express",
    type: "el-input",
    label: "字段值",
    // 字段类型不存在时隐藏
    hidden: (type) => isNil(type),
  },
];

// 审批扩展属性字段配置类
export const APPROVAL_EXTENSION_ITEMS = [
  {
    name: "name",
    type: "el-input",
    label: "属性名",
  },
  {
    name: "value",
    type: "el-input",
    label: "属性值",
  },
];

// 审批抄送提醒字段配置类
export const APPROVAL_NOTATION_ITEMS = [
  {
    name: "start",
    type: "el-cascader",
    label: "开始抄送",
    props: {
      style: { width: "100%" },
      placeholder: "Please select",
      props: { multiple: true }, // 可清除
      clearable: true, // 多选
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    name: "end",
    type: "el-cascader",
    label: "结束抄送",
    props: {
      style: { width: "100%" },
      placeholder: "Please select",
      props: { multiple: true }, // 可清除
      clearable: true, // 多选
      options: [
        {
          value: 1,
          label: "Asia",
          children: [
            {
              value: 2,
              label: "China",
              children: [
                { value: 3, label: "Beijing" },
                { value: 4, label: "Shanghai" },
                { value: 5, label: "Hangzhou" },
              ],
            },
            {
              value: 6,
              label: "Japan",
              children: [
                { value: 7, label: "Tokyo" },
                { value: 8, label: "Osaka" },
                { value: 9, label: "Kyoto" },
              ],
            },
          ],
        },
        {
          value: 14,
          label: "Europe",
          children: [
            {
              value: 15,
              label: "France",
              children: [
                { value: 16, label: "Paris" },
                { value: 17, label: "Marseille" },
                { value: 18, label: "Lyon" },
              ],
            },
            {
              value: 19,
              label: "UK",
              children: [
                { value: 20, label: "London" },
                { value: 21, label: "Birmingham" },
                { value: 22, label: "Manchester" },
              ],
            },
          ],
        },
      ],
    },
  },
];

// 审批其它字段配置类
export const APPROVAL_OTHER_ITEMS = [
  {
    name: "elementDocument",
    type: "el-input",
    label: "文档元素",
    props: {
      type: "textarea",
    },
  },
];
