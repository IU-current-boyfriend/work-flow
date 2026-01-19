import { isNil, cloneDeep, isArray } from "./utils";
import JobApprovalForm from "./JobApprovalForm";

/**
 * 审批人: 表单角色
 */
class ApprovalFormRole extends JobApprovalForm {
  // 表单角色字段
  formRule = null;

  /**
   * 清除表单角色字段
   * @returns 实例对象
   */
  clearFormRule() {
    this.formRule = null;
    return this;
  }

  /**
   * 获取表单角色对象字段
   * @returns 管理员
   */
  getAdmin() {
    return cloneDeep(this.formRule);
  }

  /**
   * 设置表单角色对象
   * @param {*} formRule 表单角色对象
   */
  setAdmin(formRule) {
    if (isNil(formRule) || !isArray(formRule)) return this;
    this.formRule = formRule;
    return this;
  }

  constructor(approvalAdmin) {
    super(approvalAdmin);
  }
}

export default ApprovalFormRole;
