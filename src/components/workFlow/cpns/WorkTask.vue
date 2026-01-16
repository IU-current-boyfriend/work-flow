<template>
  <div class="task-cell">任务</div>
</template>

<script setup></script>

<style scoped>
.task-cell {
  position: relative;
  padding: 10px 10px 10px 30px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;
}
.task-cell::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 8px;
  top: 50%;
  left: 10px;
  margin-top: -6px;
  border: 1px solid #333;
}

.task-cell:hover,
.task-cell:hover::before {
  border: 1px dashed #787be8;
  color: #787be8;
}
</style>
