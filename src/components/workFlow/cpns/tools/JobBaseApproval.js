import { isBooleanAndUndefined } from "./utils";
import {
  JOB_MANUAL_APPROVAL,
  JOB_AUTOMATIC_CONSENT,
  JOB_AUTOMATIC_REJECT,
} from "./contant";
/**
 * 基础审批功能类：用于后期扩展
 */
class JobBaseApproval {
  // 审批类型集合
  static approvals = [
    JOB_MANUAL_APPROVAL,
    JOB_AUTOMATIC_CONSENT,
    JOB_AUTOMATIC_REJECT,
  ];

  // 审批类型
  approvalType = undefined;

  // 流程是否打回
  repulse = undefined;

  /**
   * 获取审批类型
   * @returns 审批类型
   */
  getApprovalType() {
    return this.approvalType;
  }

  /**
   * 设置审批类型
   * @param {*} val 审批类型
   */
  setApprovalType(val) {
    // 非法的审批类型
    if (!JobBaseApproval.approvals.includes(val)) return;
    this.approvalType = val;
  }

  /**
   * 获取打回流程状态
   * @returns boolean
   */
  getRepulse() {
    return this.repulse;
  }

  /**
   * 设置打回流程状态
   * @param {*} val true or false or undefined
   */
  setRepulse(val) {
    if (!isBooleanAndUndefined(val)) return;
    this.repulse = val;
  }

  // 构造函数
  constructor(approvalType) {
    // 设置审批类型
    this.setApprovalType(approvalType);
  }
}

export default JobBaseApproval;
