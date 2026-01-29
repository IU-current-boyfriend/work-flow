<template>
  <div class="approval-acturators">
    <el-table
      border
      show-overflow-tooltip
      :data="acturatorsFormModel"
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
    <div class="actuator-btn">
      <el-button
        type="primary"
        class="add-btn"
        @click="openActuatorDrawerHandle"
      >
        <el-icon class="icon"><Plus /></el-icon>
        添加监听器</el-button
      >
    </div>
    <ActuatorDrawer
      ref="ActuatorDrawerRef"
      :actuator="actuator"
      @saveActuatorEventHandle="saveActuatorEventHandle"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, useTemplateRef } from "vue";
import { arrayIsEmpty, isNil, merge } from "./tools/utils";
import Actuator from "./tools/Actuator";
import ActuatorDrawer from "./ActuatorDrawer.vue";
// 表单的表头设置
const actuatorsTableProps = [
  { label: "序号", prop: "serialNumber" },
  { label: "事件类型", prop: "eventType" },
];

// 创建单体监听器对象
const actuator = ref({});
const ActuatorDrawerRef = useTemplateRef("ActuatorDrawerRef");
// 定义监听表单数据对象
const acturatorsFormModel = defineModel("actuators");
// 更新单体监听器对象
const updateActautor = (_actuator) => {
  if (isNil(_actuator)) return;
  actuator.value = _actuator;
};

// 打开执行器
const openActuatorDrawerHandle = () => ActuatorDrawerRef.value.openDrawer();

// 删除执行器
const deleteActuatorHandle = (actuator) => {
  acturatorsFormModel.value = acturatorsFormModel.value.filter(
    (a) => a.serialNumber !== actuator.serialNumber
  );
};

// 编辑执行器
const editActuatorHandle = (_actuator) => {
  updateActautor({ ..._actuator });
  openActuatorDrawerHandle();
};

// 新增执行器
const saveActuatorEventHandle = (_actuator) => {
  if (isNil(_actuator)) return;
  let serialNumber = -1;
  serialNumber =
    isNil(acturatorsFormModel.value) || arrayIsEmpty(acturatorsFormModel.value)
      ? 0
      : acturatorsFormModel.value.length + 1;
  acturatorsFormModel.value.push(merge(new Actuator(serialNumber), _actuator));
};
</script>

<style scoped>
.approval-acturators {
  padding: 8px 16px;
}
.actuator-btn .add-btn {
  width: 100%;
  margin-top: 15px;
}
.actuator-btn .add-btn .icon {
  margin-right: 5px;
}
</style>
