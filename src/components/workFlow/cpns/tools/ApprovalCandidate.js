import { cloneDeep, isArray, isNil } from "./utils";
import JobApprovalForm from "./JobApprovalForm";
import BusinessException from "./BusinessException";

/**
 * 审批人：候选人
 */
class ApprovalCandidate extends JobApprovalForm {
  // 候选人字段
  candidate = null;

  /**
   * 清除候选人字段
   * @returns 实例对象
   */
  clearCandiate() {
    this.candidate = null;
    return this;
  }

  /**
   * 设置候选人字段
   * @param {*} candidate 候选人
   * @returns
   */
  setCandiate(candidate) {
    if (isNil(candidate) || !isArray(candidate)) return;
    this.candidate = candidate;
    return this;
  }

  /**
   * 获取候选人
   * @returns 返回候选人
   */
  getCandiate() {
    return cloneDeep(this.candidate);
  }

  /**
   * 重写父类的方法
   * @returns
   */
  getApprovalMode() {
    BusinessException.invalidOperationMethod(
      "ApprovalCandidate",
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
      "ApprovalCandidate",
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
      "ApprovalCandidate",
      "clearApprovalMode"
    );
    return this;
  }

  /**
   * 清除审批模式
   */
  _deleteApprovalMode() {
    delete this.approvalMode;
  }

  constructor(approvalAdmin) {
    super(approvalAdmin);
    // 清除审批方式的字段
    this._deleteApprovalMode();
  }
}

export default ApprovalCandidate;
