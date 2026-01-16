<template>
  <!-- <Flow-Node /> -->
  <!-- <Flow-Side /> -->
  <!-- <Flow-Port /> -->
  <!-- <custom-event /> -->
  <!-- <Embedding /> -->
  <!-- <Extend-parent /> -->
  <!-- <Vue-Node /> -->
  <!-- <Process-Vue /> -->
  <!-- <Element /> -->
  <Work-Flow />
</template>

<script setup>
import FlowNode from "./components/node/FlowNode.vue";
import FlowSide from "./components/side/FlowSide.vue";
import FlowPort from "./components/connector/FlowPort.vue";
import CustomEvent from "./components/event/CustomEvent.vue";
import Embedding from "./components/group/Embedding.vue";
import ExtendParent from "./components/event/ExtendParent.vue";
import VueNode from "./components/node/VueNode.vue";
import ProcessVue from "./components/node/ProcessVue.vue";
import Element from "./components/element/Element.vue";
import WorkFlow from "./components/workFlow/WorkFlow.vue";
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
