import { cloneDeep, isNil, isArray } from "./utils";
import JobApprovalForm from "./JobApprovalForm";

/**
 * 审批人: 表单管理员
 */
class ApprovalAdmin extends JobApprovalForm {
  // 表单管理员字段
  admin = null;

  /**
   * 清除表单管理员字段
   * @returns 实例对象
   */
  clearAdmin() {
    this.admin = null;
    return this;
  }

  /**
   * 获取管理员对象字段
   * @returns 管理员
   */
  getAdmin() {
    return cloneDeep(this.admin);
  }

  /**
   * 设置管理员对象
   * @param {*} admin 管理员
   */
  setAdmin(admin) {
    if (isNil(admin) || !isArray(admin)) return this;
    this.admin = admin;
    return this;
  }

  constructor(approvalAdmin) {
    super(approvalAdmin);
  }
}

export default ApprovalAdmin;
