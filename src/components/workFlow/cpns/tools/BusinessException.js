import * as CONTANT from "./contant";
class BusinessException {
  /**
   * 无效的工厂标识
   * @param {*} mark 工厂唯一标识
   */
  static invalidFactoryException(mark) {
    throw new Error(`'${mark}'${CONTANT.INVALID_FACTORY_EXCEPTION}`);
  }
  /**
   * 非法监听器属性
   * @param {*} key 键名
   */
  static invalidMonitorKey(key) {
    throw new Error(`${CONTANT.INVALID_MONITOR_FIELD}${key}`);
  }

  /**
   * 非法监听器注入字段属性
   * @param {*} key 键名
   */
  static invalidMonitorFieldKey(key) {
    throw new Error(`${CONTANT.INVALID_MONITOR_INJECT_FIELD}${key}`);
  }

  /**
   * 无效的监听器移除
   */
  static invalidMonitorRemove() {
    throw new Error(CONTANT.INVALID_MONITOR_REMOVE);
  }

  /**
   * 无效的扩展属性移除
   */
  static invalidExtensionRemove() {
    throw new Error(CONTANT.INVALID_EXTENSION_REMOVE);
  }

  /**
   * 索引越界
   * @param {*} index 索引
   */
  static isIndexOutOfBounds(index) {
    throw new Error(`${CONTANT.INDEX_OUT_OF_BOUNDS}${index}`);
  }
}

export default BusinessException;
