import { isNil, isPlainObject } from "./utils";
import JobBaseApproval from "./JobBaseApproval";
import JobApprovalFormFactory from "./JobApprovalFormFactory";
/**
 *  人工审批数据对象
 */
class JobManualApproval extends JobBaseApproval {
  /**
   * 审批表单对象
   */
  approvalForm = null;

  /**
   * 清除表单审批对象
   */
  clearApprovalForm() {
    this.approvalForm = null;
  }

  /**
   * 获取审批表单对象
   * @returns 审批表单对象
   */
  getApprovalForm() {
    return this.approvalForm;
  }

  /**
   * 设置审批人表单对象
   * @param {*} approvalHuman 审批人类型
   */
  setApprovalForm(approvalHuman) {
    if (!isNil(this.approvalForm)) this.clearApprovalForm();
    // 重新设置表单对象
    this.initApprovalForm(approvalHuman);
    // 返回实例对象
    return this;
  }

  /**
   * 初始化审批单对象
   */
  initApprovalForm(approvalHuman) {
    // 实例化审批表单对象
    this.approvalForm =
      JobApprovalFormFactory.createApprovalForm(approvalHuman);
    // 返回实例对象
    return this;
  }

  /**
   * 回显审批单对象
   * @param {*} options 审批单配置项
   */
  echoApprovalForm(options) {
    console.log("echo: =>");
  }

  /**
   * 初始化方法
   * @param {*} options 审批单配置项
   */
  init(options) {
    // 如果审批配置项不存在或者不是对象,则走初始化审批单功能
    if (isNil(options) || !isPlainObject(options)) {
      this.initApprovalForm();
      return;
    }

    // option因为是固定的,就不做容错了,恶意传递参数没有意义,程序员自己传递
    this.echoApprovalForm(options);
  }

  /**
   * 初始化人工审批单对象
   * @param {*} approvalType 审批单类型
   * @param {*} options 审批单配置项
   */
  constructor(approvalType, options) {
    super(approvalType);
    this.init(options);
  }
}

export default JobManualApproval;
