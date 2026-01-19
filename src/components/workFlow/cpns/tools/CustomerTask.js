import { ACTIVITY, JOB_MANUAL_APPROVAL } from "./contant";
import { getUUID, cloneDeep, isNil } from "./utils";
import BaseTask from "./BaseTask";
import JobBaseApproval from "./JobBaseApproval";
import GenerateBaseJobFactory from "./GenerateBaseJobFactory";
import BusinessException from "./BusinessException";

class CustomerTask extends BaseTask {
  // 常规属性
  general = {
    id: undefined,
    name: undefined,
    mark: undefined,
  };

  // 任务数据实例对象
  approvalTask = null;

  // 获取任务实例对象
  getApprovalTask() {
    return this.approvalTask;
  }

  // 设置任务实例对象
  clearApprovalTask() {
    // 清空任务对象
    this.approvalTask = null;
  }

  setApprovalTask(aprrovalTask) {
    if (!isNil(aprrovalTask)) this.clearApprovalTask();
    // 设置非法的审批任务实例对象
    if (!(aprrovalTask instanceof JobBaseApproval)) {
      BusinessException.invalidApprovalTask("customerTask class");
      return;
    }
    this.approvalTask = aprrovalTask;
  }

  initGeneral() {
    // 初始化普通任务的id值
    this.setGeneral("id", `${ACTIVITY}${getUUID()}`);
  }

  init() {
    this.initGeneral();
    this.setApprovalTask(
      GenerateBaseJobFactory.generateJob(JOB_MANUAL_APPROVAL)
    );
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
