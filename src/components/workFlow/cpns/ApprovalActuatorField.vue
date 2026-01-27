<template>
  <!-- 注入字段 -->
  <div class="actuator-field">
    <header class="header">
      <div class="header-left">
        <el-icon :size="20"><Menu /></el-icon>
        <span class="title">注入字段：</span>
      </div>
      <div class="header-right">
        <el-button type="primary" size="large" @click="addActuatorFieldHandle"
          >添加字段</el-button
        >
      </div>
    </header>
    <main class="main">
      <el-table
        border
        :data="defineFields.fields"
        :header-cell-style="{ color: '#333' }"
      >
        <el-table-column
          v-for="prop of actuatorFieldTableProps"
          :key="prop.prop"
          :prop="prop.prop"
          :label="prop.label"
          :width="prop.width"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="操作" align="center" width="100px">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="() => editActuatorFieldHandle(scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="() => deleteActuatorFieldHandle(scope.row)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
  <AddActuatorFieldModal
    ref="addActuatorFieldRef"
    @dialogCloseEventHandle="dialogCloseEventHandle"
  >
    <ActuatorFieldFormBuilder />
  </AddActuatorFieldModal>
</template>

<script setup>
import { ref, computed, useTemplateRef } from "vue";
import { cloneDeep, isFunction, keys } from "./tools/utils";
import { ACTUACTOR_FIELD_RULES } from "./tools/rules";
import { ACTUACTOR_FIELD_ITEMS } from "./tools/formDeploy";
import { useFormBuilder } from "./tools/useFormBuilder";
import AddActuatorFieldModal from "./AddActuatorFieldModal.vue";
import { isNil } from "lodash";
// 定义属性值
const defineFields = defineProps({
  fields: {
    type: Array,
    default: [],
  },
});

// 定义注入字段的表单数据
const actuatorField = ref({
  name: undefined, // 字段名称
  type: undefined, // 字段类型
  express: undefined, // 字段值或者字段表达式
});

// 定义对话框的实例
const addActuatorFieldRef = useTemplateRef("addActuatorFieldRef");

const acquireFieldFormItems = () => {
  return computed(() => {
    // 初次在挂载动态组件的时候执行,因为useFormBuilder => ...{props}调用到了.value
    return ACTUACTOR_FIELD_ITEMS.reduce((r, c) => {
      const deploy = cloneDeep(c);
      // 处理表单组件的更新与显示,但未更新当前组件绑定的状态
      if (isFunction(deploy.hidden))
        deploy.hidden = deploy.hidden(actuatorField.value.type);
      r.push(deploy);
      return r;
    }, []);
  });
};

// 定义注入字段表单的校验规则
const actuatorFieldFormRules = ref(ACTUACTOR_FIELD_RULES);
// 定义注入字段表单的组件结构
const actuatorFieldFormItems = acquireFieldFormItems();

// 创建表单实例对象
const useFormBuilderInstance = useFormBuilder({
  formItems: actuatorFieldFormItems,
  formRules: actuatorFieldFormRules,
  modelValue: actuatorField,
  formLabelWidth: "80px",
});

// 创建表单组件实例对象
const ActuatorFieldFormBuilder = ref(useFormBuilderInstance.FormBuilder);

// 表单的表头设置
const actuatorFieldTableProps = [
  { label: "序号", prop: "serialNumber" },
  { label: "字段名称", prop: "name" },
  { label: "字段类型", prop: "type" },
  { label: "字段值/表达式", prop: "express" },
];

// 重置注入字段对象值
const resetActuatorField = () => {
  keys(actuatorField.value).forEach((key) => {
    actuatorField.value[key] = undefined;
  });
};

// 更新注入字段对象值
const updateActuatorField = (field) => {
  if (isNil(field)) return;
  actuatorField.value = { ...field };
};

// 编辑字段
const editActuatorFieldHandle = (row) => {
  // 更新注入字段对象值
  updateActuatorField(row);
  // 打开对话框
  addActuatorFieldRef.value.openDialog();
};
// 删除字段
const deleteActuatorFieldHandle = (row) => {
  console.log("删除字段:=>", row);
};
const addActuatorFieldHandle = () => {
  addActuatorFieldRef.value.openDialog();
};

const dialogCloseEventHandle = () => {
  resetActuatorField();
  useFormBuilderInstance.resetFields();
};
</script>

<style scoped>
.actuator-field .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  padding: 3px 0 0 5px;
  font-size: 16px;
}
.main {
  margin: 20px 0;
}
</style>
