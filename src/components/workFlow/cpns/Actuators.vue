<template>
  <div class="actuators">
    <el-table
      border
      :data="defineActuators.actuators"
      :header-cell-style="{ color: '#333' }"
    >
      <el-table-column
        v-for="prop of actuatorsTableProps"
        :key="prop.prop"
        :prop="prop.prop"
        :label="prop.label"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="() => editActuatorHandle(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="() => deleteActuatorHandle(scope.row)"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="add-actuator-btn">
      <el-button type="primary" class="add-btn" @click="addActuatorHandle">
        <el-icon class="icon"><Plus /></el-icon>
        添加监听器</el-button
      >
    </div>
    <AddActuatorModal ref="actuatorModalRef" :actuator="actuator" />
  </div>
</template>

<script setup>
import { ref, watch, computed, useTemplateRef } from "vue";
import { isNil, cloneDeep, keys } from "./tools/utils";

// 表单的表头设置
const actuatorsTableProps = [
  { label: "序号", prop: "serialNumber" },
  { label: "事件类型", prop: "eventType" },
];

// 定义执行器props属性对象
const defineActuators = defineProps({
  actuators: {
    type: Array,
    default: () => [
      {
        serialNumber: 1,
        eventType: "自定义事件",
        choseClass: "11233",
        clazz: "11233",
        fields: [
          {
            serialNumber: 1,
            name: "自定义字段名",
            type: "字符串",
            express: "表达式",
          },
        ],
      },
    ],
  },
});
// 创建单体监听器对象
const actuator = ref({});
// 创建监听器的集合状态对象
const approvalActuators = ref([]);
// 创建模态框实例对象
const actuatorModalRef = useTemplateRef("actuatorModalRef");

/**
 * 初始化监听器
 */
const initApprovalActuators = (actuatorCollect = null) => {
  const _actuators = isNil(actuatorCollect)
    ? defineActuators.approvalActuators
    : actuatorCollect;
  // 设置监听器的集合状态对象
  approvalActuators.value = cloneDeep(_actuators);
};

// 更新单体监听器状态
const updateActuator = (newActuator) => {
  if (isNil(newActuator)) return;
  actuator.value = { ...newActuator };
};

// 添加执行器
const addActuatorHandle = () => {
  actuatorModalRef.value.openDrawer();
};

// 编辑执行器
const editActuatorHandle = (row) => {
  updateActuator(row);
  actuatorModalRef.value.openDrawer();
};
// 删除执行器
const deleteActuatorHandle = (row) => {};

// 初始化组件状态
initApprovalActuators();

// 监听执行器的变化
watch(
  () => defineActuators.actuators,
  (approvalActuators) => {
    initApprovalActuators(approvalActuators);
  }
);
</script>

<style scoped>
.actuators {
  padding: 8px 16px;
}

.add-actuator-btn .add-btn {
  width: 100%;
  margin-top: 15px;
}
.add-actuator-btn .add-btn .icon {
  margin-right: 5px;
}
</style>
