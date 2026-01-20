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
  };

  // 任务数据实例对象
  approvalTask = null;

  // 抄送提醒
  notation = {
    start: null, // 抄送开始的索引数组（树型结构）
    end: null, // 抄送结束的索引数组（树型结构）
  };

  /**
   * 设置抄送信息
   * @param {*} key 键名
   * @param {*} val 键值
   */
  setNotation(key, val) {
    // key == undefined || null
    if (isNil(key)) return;
    // key no exist
    if (!Object.keys().includes(key)) return;
    // updated
    this.notation[key] = val;
  }

  /**
   * 获取抄送提醒信息
   * @param {*} key 键名
   * @returns value or undefined(NonExist property) or null(exist property)
   */
  getNotation(key) {
    // key === null || undefined => get self
    if (isNil(key)) return cloneDeep(this.notation);
    // else return notation property
    return cloneDeep(this.notation[key]);
  }

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
