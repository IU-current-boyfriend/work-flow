import { isNil, isPlainObject } from "./utils";
import JobBaseApproval from "./JobBaseApproval";

class JobManualApproval extends JobBaseApproval {
  // 审批人0/1/2/3/4/5/6 默认0
  approvalHuman = 0;

  /**
   * 初始化审批单对象
   */
  initApprovalForm() {
    console.log("init: =>");
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
