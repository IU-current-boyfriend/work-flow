import { cloneDeep, isArray, isNil } from "./utils";
import JobApprovalForm from "./JobApprovalForm";
import BusinessException from "./BusinessException";
/**
 * 审批人：候选角色
 */
class ApprovalCandidateRole extends JobApprovalForm {
  // 候选角色字段
  candidateRole = null;

  /**
   * 清除候选角色字段
   * @returns 实例对象
   */
  clearCandidateRole() {
    this.candidateRole = null;
    return this;
  }

  /**
   * 设置候选角色字段
   * @param {*} candidateRole 候选角色
   */
  setCandidateRole(candidateRole) {
    if (isNil(candidateRole) || !isArray(candidateRole)) return this;
    this.candidateRole = candidateRole;
    return this;
  }

  /**
   * 获取候选角色字段
   * @returns 候选角色
   */
  getCandidateRole() {
    return cloneDeep(this.candidateRole);
  }

  /**
   * 清除审批模式
   */
  _deleteApprovalMode() {
    delete this.approvalMode;
  }

  /**
   * 重写父类的方法
   * @returns
   */
  getApprovalMode() {
    BusinessException.invalidOperationMethod(
      "ApprovalCandidateRole",
      "getApprovalMode"
    );
    return this;
  }

  /**
   * 重写父类的方法
   * @returns
   */
  setApprovalMode() {
    BusinessException.invalidOperationMethod(
      "ApprovalCandidateRole",
      "setApprovalMode"
    );
    return this;
  }
  /**
   *
   * @returns 实例对象
   */
  clearApprovalMode() {
    BusinessException.invalidOperationMethod(
      "ApprovalCandidateRole",
      "clearApprovalMode"
    );
    return this;
  }

  constructor(approvalAdmin) {
    super(approvalAdmin);
    // 清除审批方式的字段
    this._deleteApprovalMode();
  }
}
export default ApprovalCandidateRole;
