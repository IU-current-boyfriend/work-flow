import {
  APPROVAL_NOMINATOR,
  APPROVAL_SELF,
  APPROVAL_MANAGER,
  APPROVAL_CANDIDATE_ROLE,
  APPROVAL_ADMIN,
  APPROVAL_FORM_ROLE,
  APPROVAL_CANDIDATE,
} from "./contant";
import { isNil } from "./utils";
import BusinessException from "./BusinessException";
import ApprovalNominator from "./ApprovalNominator";
import ApprovalSelf from "./ApprovalSelf";
import ApprovalManager from "./ApprovalManager";
import ApprovalCandidate from "./ApprovalCandidate";
import ApprovalCandidateRole from "./ApprovalCandidateRole";
import ApprovalAdmin from "./ApprovalAdmin";
import ApprovalFormRole from "./ApprovalFormRole";

class JobApprovalFormFactory {
  /**
   * 审批人类型
   */
  static approvalHuman = undefined;

  /**
   * 获取不同审批人映射对象
   */
  static getApprovalFormMap() {
    return new Map([
      [APPROVAL_NOMINATOR, ApprovalNominator],
      [APPROVAL_SELF, ApprovalSelf],
      [APPROVAL_MANAGER, ApprovalManager],
      [APPROVAL_CANDIDATE, ApprovalCandidate],
      [APPROVAL_CANDIDATE_ROLE, ApprovalCandidateRole],
      [APPROVAL_ADMIN, ApprovalAdmin],
      [APPROVAL_FORM_ROLE, ApprovalFormRole],
    ]);
  }

  /**
   * 获取审批人的所有类型
   * @returns 审批人类型映射
   */
  static getApprovalHumanMap() {
    return [
      APPROVAL_NOMINATOR,
      APPROVAL_SELF,
      APPROVAL_MANAGER,
      APPROVAL_CANDIDATE,
      APPROVAL_CANDIDATE_ROLE,
      APPROVAL_ADMIN,
      APPROVAL_FORM_ROLE,
    ];
  }

  /**
   * 设置审批人类型
   * @param {*} approvalHuman 审批人类型
   */
  static setApprovalHuman(approvalHuman) {
    // 非法的审批人类型,提示异常
    if (
      isNil(approvalHuman) ||
      !this.getApprovalHumanMap().includes(approvalHuman)
    ) {
      // 抛出业务异常
      BusinessException.invalidApprovalHuman(approvalHuman);
    }
    // 正常设置
    this.approvalHuman = approvalHuman;
    return this;
  }

  /**
   * 初始化审批人类型
   * @param {*} approvalHuman 审批人类型
   */
  static initApprovalHuman(approvalHuman) {
    // 非法的审批人类型,自动转为“指定人”类型
    if (
      isNil(approvalHuman) ||
      !this.getApprovalHumanMap().includes(approvalHuman)
    ) {
      // 制定人模式
      this.setApprovalHuman(APPROVAL_NOMINATOR);
      // 返回结果
      return this;
    }
    // 根据外界配置项决定审批人类型
    this.setApprovalHuman(approvalHuman);
    return this;
  }

  /**
   * 创建审批表单对象
   * @param {*} approvalHuman 审批人类型
   * @returns 返回审批表单对象
   */
  static createApprovalForm(approvalHuman) {
    this.initApprovalHuman(approvalHuman);
    // 创建表单实例化工程、根据审批人
    const Factory = this.getApprovalFormMap().get(this.approvalHuman);
    // 实例化审批表单对象
    return new Factory(this.approvalHuman);
  }
}

export default JobApprovalFormFactory;
