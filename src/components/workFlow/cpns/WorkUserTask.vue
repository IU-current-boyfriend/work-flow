<template>
  <div class="task-user-cell">用户任务</div>
</template>

<script setup></script>

<style scoped>
.task-user-cell {
  position: relative;
  padding: 10px 10px 10px 30px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;
}

.task-user-cell::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 50%;
  left: 10px;
  margin-top: -6px;
  border: 1px solid #333;
}

.task-user-cell:hover,
.task-user-cell:hover::before {
  border: 1px dashed #787be8;
  color: #787be8;
}
</style>
