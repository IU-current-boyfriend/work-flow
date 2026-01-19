import { cloneDeep, isNil, isArray } from "./utils";
import JobApprovalForm from "./JobApprovalForm";

/**
 * 审批人：指定人
 */
class ApprovalNominator extends JobApprovalForm {
  // 处理用户属性
  disposeUser = null;

  /**
   * 清除处理用户属性
   * @returns 实例对象
   */
  clearDisposeUser() {
    this.disposeUser = null;
    return this;
  }

  /**
   * 获取处理用户属性
   * @returns 处理用户属性值
   */
  getDisposeUser() {
    return cloneDeep(this.disposeUser);
  }

  /**
   * 设置处理用户属性
   * @param {*} disposeUser 用户属性
   */
  setDisposeUser(disposeUser) {
    // undefined or null and not is array  => return;
    if (isNil(disposeUser) || !isArray(disposeUser)) return this;
    this.disposeUser = disposeUser;
    return this;
  }

  constructor(approvalAdmin) {
    super(approvalAdmin);
  }
}

export default ApprovalNominator;
