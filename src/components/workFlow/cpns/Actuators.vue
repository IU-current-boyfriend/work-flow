<template>
  <div class="actuators">actuators</div>
</template>

<script setup>
// 执行器组件属性集合
const actuatorsProps = defineProps({
  approval: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.actuators {
  padding: 8px 16px;
}
.actuators-table {
  margin-bottom: 15px;
}
.actuators-info-btn .add-btn {
  width: 100%;
}
</style>
