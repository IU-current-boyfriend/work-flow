import {
  INVALID_MONITOR_INJECT_FIELD,
  INVALID_FACTORY_EXCEPTION,
  INVALID_MONITOR_NUMBER,
  INVALID_MONITOR_FIELD,
  INVALID_MONITOR_REMOVE,
  INVALID_EXTENSION_REMOVE,
  INDEX_OUT_OF_BOUNDS,
  INVALID_APPROVAL_HUMAN,
  INVALID_APPROVAL_MODE,
  INVALID_NO_APPROVAL_HUAMN,
  INVALID_OPERATION_METHOD,
  INVALID_APPROVAL_TASK,
  INVALID_TASK_INSTANCE,
} from "./contant";
class BusinessException {
  /**
   * 无效的工厂标识
   * @param {*} mark 工厂唯一标识
   */
  static invalidFactoryException(mark) {
    throw new Error(`'${mark}'${INVALID_FACTORY_EXCEPTION}`);
  }
  /**
   * 非法监听器属性
   * @param {*} key 键名
   */
  static invalidMonitorKey(key) {
    throw new Error(`${INVALID_MONITOR_FIELD}${key}`);
  }

  /**
   * 非法监听器注入字段属性
   * @param {*} key 键名
   */
  static invalidMonitorFieldKey(key) {
    throw new Error(`${INVALID_MONITOR_INJECT_FIELD}${key}`);
  }

  /**
   * 无效的监听器移除
   */
  static invalidMonitorRemove() {
    throw new Error(INVALID_MONITOR_REMOVE);
  }

  /**
   * 无效的扩展属性移除
   */
  static invalidExtensionRemove() {
    throw new Error(INVALID_EXTENSION_REMOVE);
  }

  /**
   * 索引越界
   * @param {*} index 索引
   */
  static isIndexOutOfBounds(index) {
    throw new Error(`${INDEX_OUT_OF_BOUNDS}${index}`);
  }

  /**
   * 非法的审批人类型
   */
  static invalidApprovalHuman(approvalHuman) {
    throw new Error(`${INVALID_APPROVAL_HUMAN}${approvalHuman}`);
  }

  /**
   * 非法的审批方式
   * @param {*} approvalMode
   */
  static invalidApprovalMode(approvalMode) {
    throw new Error(`${INVALID_APPROVAL_MODE}${approvalMode}`);
  }

  static invalidNoApprovalHuman(noApprovalHuman) {
    throw new Error(`${INVALID_NO_APPROVAL_HUAMN}${noApprovalHuman}`);
  }

  static invalidOperationMethod(clazz, method) {
    console.warn(`${clazz}${INVALID_OPERATION_METHOD}${method}`);
  }

  static invalidApprovalTask(clazz) {
    console.warn(`${clazz}${INVALID_APPROVAL_TASK}`);
  }

  static invalidTaskInstance(clazz) {
    throw new Error(`${clazz}${INVALID_TASK_INSTANCE}`);
  }
}

export default BusinessException;
