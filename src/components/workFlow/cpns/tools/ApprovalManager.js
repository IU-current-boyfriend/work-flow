import { cloneDeep, isNil, isArray } from "./utils";
import JobApprovalForm from "./JobApprovalForm";

/**
 * 审批人：主管
 */
class ApprovalManager extends JobApprovalForm {
  // 主管字段
  manager = null;

  /**
   * 清除主管字段
   * @returns 实例对象
   */
  clearManager() {
    this.manager = null;
    return this;
  }

  /**
   * 获取主管字段
   * @returns 主管字段
   */
  getManager() {
    return cloneDeep(this.manager);
  }

  /**
   * 设置主管字段
   * @param {*} manager 主管字段
   */
  setManager(manager) {
    // undefined or null and not is array  => return;
    if (isNil(manager) || !isArray(manager)) return this;
    this.manager = manager;
    return this;
  }
  constructor(approvalAdmin) {
    super(approvalAdmin);
  }
}

export default ApprovalManager;
