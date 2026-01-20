<template>
  <div class="aside">
    <!-- 任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <Work-Task @click="workTaskHandle" />
      </el-col>
    </el-row>
    <!-- 服务任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <Work-User-Task @click="workUserTaskHandle" />
      </el-col>
    </el-row>
    <!-- 服务任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <el-radio-group v-model="approvalModel">
          <el-radio :value="JOB_MANUAL_APPROVAL" size="large"
            >人工审批</el-radio
          >
          <el-radio :value="JOB_AUTOMATIC_CONSENT" size="large"
            >自动同意</el-radio
          >
          <el-radio :value="JOB_AUTOMATIC_REJECT" size="large"
            >自动拒绝</el-radio
          >
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 服务任务组件 -->
    <el-row class="element">
      <el-col :span="24">
        <el-radio-group v-model="approvalHuman">
          <el-radio :value="APPROVAL_NOMINATOR" size="large">指定人</el-radio>
          <el-radio :value="APPROVAL_SELF" size="large">发起人自己</el-radio>
          <el-radio :value="APPROVAL_MANAGER" size="large">主管</el-radio>
          <el-radio :value="APPROVAL_CANDIDATE" size="large">候选人</el-radio>
          <el-radio :value="APPROVAL_CANDIDATE_ROLE" size="large"
            >候选角色</el-radio
          >
          <el-radio :value="APPROVAL_ADMIN" size="large">表单管理员</el-radio>
          <el-radio :value="APPROVAL_FORM_ROLE" size="large">表单角色</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  NORMAL_TASK_FACTORY,
  CUSTOMER_TASK_FACTORY,
  JOB_MANUAL_APPROVAL,
  JOB_AUTOMATIC_CONSENT,
  JOB_AUTOMATIC_REJECT,
  APPROVAL_NOMINATOR,
  APPROVAL_SELF,
  APPROVAL_MANAGER,
  APPROVAL_CANDIDATE,
  APPROVAL_CANDIDATE_ROLE,
  APPROVAL_ADMIN,
  APPROVAL_FORM_ROLE,
} from "./tools/contant";
import WorkTask from "./WorkTask.vue";
import WorkUserTask from "./WorkUserTask.vue";
import GenerateBaseTaskFactory from "./tools/GenerateBaseTaskFactory";
import GenerateBaseJobFactory from "./tools/GenerateBaseJobFactory";

// 自定义事件类型
const emits = defineEmits(["update:clickTaskHandle"]);

// 审批类型
const approvalModel = ref();

// 审批类型实例对象
const approvalModelInstance = ref();

// 审批人
const approvalHuman = ref();

const workTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(NORMAL_TASK_FACTORY);
  emits("update:clickTaskHandle", instance);
};

const workUserTaskHandle = () => {
  const instance = GenerateBaseTaskFactory.generateTask(CUSTOMER_TASK_FACTORY);
  // 监听审批类型,审批类型发生变化
  watch(approvalModel, (model) => {
    // 更新任务数据对象
    instance.setApprovalTask(GenerateBaseJobFactory.generateJob(model));
  });
  // 监听审批人变化
  watch(approvalHuman, (human) => {
    // 更新审批人表单数据对象
    instance.getApprovalTask().setApprovalForm(human);
  });
  emits("update:clickTaskHandle", instance);
};
</script>

<style scoped>
.aside {
  padding: 20px;
  background-color: #fff;
}
.aside .element {
  margin: 15px 0;
}
.aside .element:first-child {
  margin-top: 0;
}
</style>
