<template>
  <el-drawer
    v-model="drawer"
    :size="collapseWidth"
    title="执行监听器"
    @close="closeDrawerEventHandle"
  >
    <!-- 基础表单 -->
    <ApprovalActuatorFormBuilder />
    <!--  分割线 -->
    <el-divider />
    <!-- 注入字段 -->
    <ActuatorFields
      :fields="approvalActuator.fields"
      @deleteActuatorFieldHandle="deleteActuatorFieldHandle"
      @addAprrovalFieldEventHandle="addAprrovalFieldEventHandle"
    />
    <!-- 按钮 -->
    <div class="btn-groups">
      <el-row justify="space-between" :gutter="10">
        <el-col :span="12">
          <el-button @click="closeDrawer">取消</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="saveActuatorEventHandle"
            >保存</el-button
          >
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, inject, computed, watch } from "vue";
import { isNil, keys, isArray, cloneDeep, concat } from "./tools/utils";
import { ACTUACTOR_FROM_RULES } from "./tools/rules";
import { ACTUACTOR_FROM_ITEMS } from "./tools/formDeploy";
import { useFormBuilder } from "./tools/useFormBuilder";
import ActuatorFields from "./ActuatorFields.vue";

// 定义单体执行器props属性对象
const defineActuator = defineProps({
  actuator: Object,
});

// 定义自定义事件
const emits = defineEmits(["saveActuatorEventHandle"]);

const collapseWidth = inject("collapseWidth");

// 模态框的显示状态
const drawer = ref(false);

// 设置模态框的方法
const setDrawer = (visiable) => {
  drawer.value = visiable;
};

// 创建监听器表单对象
const approvalActuator = ref({});

// 创建动态表单的校验规则
const approvalActuatorFormRules = ref(ACTUACTOR_FROM_RULES);
// 创建动态表单的组件结构
const approvalActuatorFormItems = computed(() => ACTUACTOR_FROM_ITEMS);
// 创建动态表单对象
const useFormBuilderInstance = useFormBuilder({
  formItems: approvalActuatorFormItems,
  formRules: approvalActuatorFormRules,
  modelValue: approvalActuator,
  formLabelWidth: "80px",
});
// 创建基础动态表单组件
const ApprovalActuatorFormBuilder = ref(useFormBuilderInstance.FormBuilder);

// 清除表单数据
const resetApprovalActuator = () => {
  keys(approvalActuator.value).forEach((key) => {
    approvalActuator.value[key] = undefined;
  });
};

// 更新组件状态
const updateApprovalActuator = (actuator = null) => {
  const _actuator = isNil(actuator)
    ? approvalActuator.value
    : { ...approvalActuator.value, ...actuator };
  // 更新组件状态
  approvalActuator.value = _actuator;
};

// 打开模态框方法
const openDrawer = () => setDrawer(true);
// 关闭模态框方法
const closeDrawer = () => setDrawer(false);

// 处理关闭模态框事件
const closeDrawerEventHandle = () => {
  useFormBuilderInstance.resetFields();
  resetApprovalActuator();
};
// 处理保存模态框事件
const saveActuatorEventHandle = () => {
  emits("saveActuatorEventHandle", cloneDeep(approvalActuator.value));
  closeDrawer();
  closeDrawerEventHandle();
};

// 增加字段方法
const addAprrovalFieldEventHandle = (field) => {
  const fields = approvalActuator.value.fields;
  let serialNumber = -1;
  if (!isNil(fields)) {
    const exist = fields.some((f) => f.serialNumber === field.serialNumber);
    if (exist) {
      // 编辑操作
      approvalActuator.value.fields = approvalActuator.value.fields.map((f) => {
        if (f.serialNumber === field.serialNumber) return field;
        return f;
      });
      return;
    }
  }
  // 新增操作
  serialNumber = isNil(fields) ? 1 : fields.length + 1;
  approvalActuator.value.fields = concat(isNil(fields) ? [] : fields, {
    ...field,
    serialNumber,
  });
};

/**
 * 移除字段
 */
const deleteActuatorFieldHandle = (field) => {
  // 移除字段
  approvalActuator.value.fields = approvalActuator.value.fields.filter(
    (f) => f.serialNumber !== field.serialNumber
  );
};

// 监听单体监听器变化
watch(
  () => defineActuator.actuator,
  (actuator) => {
    updateApprovalActuator(actuator);
  }
);

// 执行器表单中的选择类与类的数据相同
watch(
  () => approvalActuator.value.choseClass,
  (newVal) => {
    if (approvalActuator.value.clazz !== newVal)
      approvalActuator.value.clazz = newVal;
  }
);

defineExpose({
  openDrawer,
  closeDrawer,
});
</script>

<style scoped>
.btn-groups :deep(.el-button) {
  width: 100%;
}
</style>
