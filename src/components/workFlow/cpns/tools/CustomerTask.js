import BaseTask from "./BaseTask";
import { ACTIVITY } from "./contant";
import { getUUID } from "./utils";

class CustomerTask extends BaseTask {
  // 常规属性
  general = {
    id: undefined,
    name: undefined,
    mark: undefined,
  };

  initGeneral() {
    // 初始化普通任务的id值
    this.setGeneral("id", `${ACTIVITY}${getUUID()}`);
  }

  init() {
    this.initGeneral();
  }

  // 构造方法
  constructor() {
    // 初始化父类
    super();
    // 初始化方法
    this.init();
  }
}

export default CustomerTask;
