import * as CONTANT from "./contant";
import BaseTask from "./BaseTask";
import BusinessException from "./BusinessException";
import { getUUID, cloneDeep, isNil, keys } from "./utils";

class CustomerTask extends BaseTask {
  // 常规属性
  general = {
    id: undefined,
    name: undefined,
  };

  // 抄送提醒
  notation = {
    start: undefined, // 抄送开始的索引数组（树型结构）
    end: undefined, // 抄送结束的索引数组（树型结构）
  };

  // 审批任务 默认数据
  approvalTask = {
    // 审批类型
    approvalType: CONTANT.JOB_MANUAL_APPROVAL,
    // 审批人
    approvalHuman: CONTANT.APPROVAL_NOMINATOR,
    // 处理用户
    handlePerson: undefined,
    // 主管
    approvalManager: undefined,
    // 候选人
    approvalCandidatePerson: undefined,
    // 候选角色
    approvalCandidateRole: undefined,
    // 表单管理员
    approvalFormAdmin: undefined,
    // 表单角色
    approvalFormRule: undefined,
    // 审批方式
    approvalMode: "或签",
    // 审批人为空
    nonApproval: "自动通过",
    // 指定审批人
    nonApprovalHuman: undefined,
    // 打回流程
    repluse: "否",
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
    if (!keys(this.notation).includes(key)) return;
    // updated
    this.notation[key] = val;
  }

  setApprovalTask(aprrovalTask) {
    if (!isNil(aprrovalTask)) this.clearApprovalTask();
    this.approvalTask = aprrovalTask;
  }

  initGeneral() {
    // 初始化普通任务的id值
    this.setGeneral("id", `${CONTANT.ACTIVITY}${getUUID()}`);
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
