<template>
  <div class="extensions-container">
    <el-table
      border
      show-overflow-tooltip
      :data="extensionsModel"
      :header-cell-style="{ color: '#333' }"
    >
      <el-table-column
        v-for="prop of extensionsTableProps"
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
            @click="() => editExtensionHandle(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="() => deleteExtensionHandle(scope.row)"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="add-extension-btn">
      <el-button type="primary" class="add-btn" @click="openExtensionHandle">
        <el-icon class="icon"><Plus /></el-icon>
        添加属性</el-button
      >
    </div>
    <ExtensionModal
      ref="ExtensionModalRef"
      @dialogCloseEventHandle="dialogCloseEventHandle"
      @dialogSubmitEventHandle="dialogSubmitEventHandle"
    >
      <ExtensionFormBuilder />
    </ExtensionModal>
  </div>
</template>

<script setup>
import { ref, watch, computed, useTemplateRef } from "vue";
import {
  keys,
  merge,
  isNil,
  concat,
  cloneDeep,
  arrayIsEmpty,
} from "./tools/utils";
import { useFormBuilder } from "./tools/useFormBuilder";
import { ACTUACTOR_EXTENSION_RULES } from "./tools/rules";
import { ACTUACTOR_EXTENSION_ITEMS } from "./tools/formDeploy";
import Extension from "./tools/Extension";
import ExtensionModal from "./ExtensionModal.vue";

// 定义扩展属性表格属性
const extensionsTableProps = [
  { label: "序号", prop: "serialNumber" },
  { label: "属性名", prop: "name" },
  { label: "属性值", prop: "value" },
];

// 定义审批单个扩展属性
const extensionFormModel = ref({
  name: undefined, // 扩展属性名
  value: undefined, // 扩展属性值
  serialNumber: undefined, // 扩展属性序列号
});

// 定义扩展属性表单对象
const extensionsModel = defineModel("extensions");

// 定义添加扩展属性弹窗实例对象
const ExtensionModalRef = useTemplateRef("ExtensionModalRef");
// 创建扩展属性表单校验规则
const extensionFormRules = ref(ACTUACTOR_EXTENSION_RULES);
// 创建扩展属性表单结构
const extensionFormItems = computed(() => ACTUACTOR_EXTENSION_ITEMS);

// 创建动态表单的组件
const useFormBuilderInstance = useFormBuilder({
  formItems: extensionFormItems,
  formRules: extensionFormRules,
  modelValue: extensionFormModel,
  formLabelWidth: "80px",
});

// 创建表单组件实例对象
const ExtensionFormBuilder = ref(useFormBuilderInstance.FormBuilder);

/**
 * 重置扩展属性对象状态
 */
const resetExtension = () => {
  keys(extensionFormModel.value).forEach((key) => {
    extensionFormModel.value[key] = undefined;
  });
};

/**
 * 更新扩展属性对象状态
 */
const updateExtension = (_extension) => {
  if (isNil(_extension)) return;
  extensionFormModel.value = { ..._extension };
};

/**
 * 编辑扩展属性
 */
const editExtensionHandle = (extension) => {
  updateExtension(extension);
  openExtensionHandle();
};

/**
 * 删除扩展属性
 */
const deleteExtensionHandle = (_extension) => {
  if (isNil(_extension)) return;
  // 过滤不需要删除的属性对象
  extensionsModel.value = extensionsModel.value.filter(
    (extension) => extension.serialNumber !== _extension.serialNumber
  );
};

/**
 * 打开扩展属性弹窗
 */
const openExtensionHandle = () => ExtensionModalRef.value.openDialog();

/**
 * 关闭扩展属性弹窗
 */
const closeExtensionHandle = () => ExtensionModalRef.value.closeDialog();

/**
 * 增加扩展属性弹窗关闭
 */
const dialogCloseEventHandle = () => {
  // 清除表单的校验规则和值
  useFormBuilderInstance.resetFields();
  // 重置当前组件状态
  resetExtension();
};

/**
 * 扩展属性对象操作
 */
const extensionOperation = () => {
  // 有增加有编辑操作
  const extensions = extensionsModel.value;
  // 定义序列号
  let serialNumber = -1;
  // 区别是新增还是编辑操作
  if (!isNil(extensions) || !arrayIsEmpty(extensions)) {
    const exist = extensions.some(
      (e) => e.serialNumber === extensionFormModel.value.serialNumber
    );
    if (exist) {
      // 编辑操作
      extensionsModel.value = extensionsModel.value.map((e) => {
        if (e.serialNumber === extensionFormModel.value.serialNumber)
          return extensionFormModel.value;
        return e;
      });
      return;
    }
  }
  // 新增操作
  serialNumber = isNil(extensions) ? 1 : extensions.length + 1;
  extensionsModel.value.push(
    merge(new Extension(serialNumber), extensionFormModel.value)
  );
};

/**
 * 保存扩展属性对象
 */
const dialogSubmitEventHandle = () => {
  extensionOperation();
  closeExtensionHandle();
};
</script>

<style scoped>
.extensions-container {
  padding: 8px 16px;
}
.add-extension-btn .add-btn {
  width: 100%;
  margin-top: 15px;
}
.add-extension-btn .add-btn .icon {
  margin-right: 5px;
}
</style>
