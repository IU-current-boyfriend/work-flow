import {
  APPROVAL_NOMINATOR,
  APPROVAL_SELF,
  APPROVAL_MANAGER,
  APPROVAL_CANDIDATE_ROLE,
  APPROVAL_ADMIN,
  APPROVAL_FORM_ROLE,
  APPROVAL_CANDIDATE,
  APPROVAL_ALL_AGRESS_MODE,
  APPROVAL_OR_AGRESS_MODE,
  NO_APPROVAL_AUTO_PASS,
  NO_APPROVAL_AUTO_REJECT,
  NO_APPROVAL_APPOINT,
} from "./contant";
import { isNil, cloneDeep } from "./utils";
import BusinessException from "./BusinessException";
import JobApprovalFormFactory from "./JobApprovalFormFactory";
/**
 * 任务审批表单数据对象
 */
class JobApprovalForm {
  /**
   * 获取审批人为空时映射
   * @returns 审批人为空映射
   */
  static getNoApprovalHumanMap() {
    return [
      NO_APPROVAL_AUTO_PASS,
      NO_APPROVAL_AUTO_REJECT,
      NO_APPROVAL_APPOINT,
    ];
  }

  /**
   * 获取审批方式映射
   * @returns 审批方式映射
   */
  static getApprovalModeMap() {
    return [APPROVAL_OR_AGRESS_MODE, APPROVAL_ALL_AGRESS_MODE];
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
      APPROVAL_CANDIDATE_ROLE,
      APPROVAL_ADMIN,
      APPROVAL_CANDIDATE,
      APPROVAL_FORM_ROLE,
    ];
  }

  // 审批人
  approvalHuman = undefined;
  // 审批方式
  approvalMode = undefined;
  // 审批人为空时
  noApprovalHuman = null; // 自动通过、自动拒绝、指定人员审批

  /**
   * 清除审批人
   */
  clearApprovalHuman() {
    this.approvalHuman = undefined;
    return this;
  }

  /**
   * 清除审批方式
   */
  clearApprovalMode() {
    this.approvalMode = undefined;
    return this;
  }

  /**
   * 清除审批人为空字段
   */
  clearNoapprovalHuman() {
    this.noApprovalHuman = null;
    return this;
  }

  /**
   * 获取审批人为空时
   * @returns 审批人为空时
   */
  getNoApprovalHuman() {
    return cloneDeep(this.noApprovalHuman);
  }

  /**
   * 设置审批人为空时
   * @param {*} noApprovalHuman 审批人为空时配置
   * @param {*} human 指定人员
   */
  setNoApprovalHuman(noApprovalHuman, human) {
    // 非法审批人为空判断
    if (
      isNil(noApprovalHuman) ||
      !JobApprovalForm.getNoApprovalHumanMap().includes(noApprovalHuman)
    ) {
      BusinessException.invalidNoApprovalHuman(noApprovalHuman);
    }
    // 指定人员审批需要传递对应参数
    if (noApprovalHuman === NO_APPROVAL_APPOINT) {
      this.noApprovalHuman = {
        mode: noApprovalHuman,
        humans: isNil(human) ? human : [],
      };
      return this;
    }
    // 正常设置
    this.noApprovalHuman = noApprovalHuman;
    return this;
  }

  /**
   * 获取审批方式
   * @returns 审批方式
   */
  getApprovalMode() {
    return this.approvalMode;
  }

  /**
   * 设置审批方式
   * @param {*} approvalMode 审批方式
   */
  setApprovalMode(approvalMode) {
    if (
      isNil(approvalMode) ||
      !JobApprovalForm.getApprovalModeMap().includes(approvalMode)
    ) {
      // 抛出业务异常
      BusinessException.invalidApprovalMode(approvalMode);
    }
    // 正常设置
    this.approvalMode = approvalMode;
    return this;
  }

  /**
   * 获取审批人类型
   * @returns 审批人类型
   */
  getApprovalHuman() {
    return this.approvalHuman;
  }

  /**
   * 设置审批人类型
   * @param {*} approvalHuman 审批人类型
   */
  setApprovalHuman(approvalHuman) {
    // 非法的审批人类型,提示异常
    if (
      isNil(approvalHuman) ||
      !JobApprovalForm.getApprovalHumanMap().includes(approvalHuman)
    ) {
      // 抛出业务异常
      BusinessException.invalidApprovalHuman(approvalHuman);
    }
    // 正常设置
    this.approvalHuman = approvalHuman;
    return this;
  }

  /**
   * 初始化函数
   * @param {*} approvalHuman 审批人
   */
  constructor(approvalHuman) {
    this.setApprovalHuman(approvalHuman);
  }
}

export default JobApprovalForm;
