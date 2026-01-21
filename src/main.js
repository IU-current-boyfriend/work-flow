import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ApprovalAsideVue from "./components/workFlow/cpns/tools";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 添加审批侧边栏组件
for (const [key, component] of Object.entries(ApprovalAsideVue)) {
  app.component(key, component);
}

// 添加element-icon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).mount("#app");
