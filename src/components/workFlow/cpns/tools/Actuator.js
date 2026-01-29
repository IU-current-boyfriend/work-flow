import BusinessException from "./BusinessException.js";
import { isNil, cloneDeep, keys } from "./utils.js";

/**
 * 监听器数据实例对象
 */

class Actuator {
  /**
   * 常量键名
   */
  static SERIAL_NUMBER = "serialNumber";

  /**
   * 字段模版对象
   */
  static FIELD = {
    [Actuator.SERIAL_NUMBER]: undefined,
    name: undefined,
    type: undefined,
    express: undefined,
  };

  serialNumber = undefined; // 执行器序号
  eventType = undefined; // 执行器类型
  choseClass = undefined; // 选择类
  clazz = undefined; // 类
  fields = undefined; // 字段集合

  /**
   * 添加执行器字段
   */
  addField() {
    this.fields = isNil(this.fields) ? [] : this.fields;
    this.fields.push({
      ...Actuator.FIELD,
      [Actuator.SERIAL_NUMBER]: this.fields.length + 1,
    });
    return this;
  }

  /**
   * 设置监听器属性
   * @param {*} key 键名
   * @param {*} val 键值
   */
  setActuator(key, val) {
    // 非法的键名更新
    if (!keys(this).includes(key)) {
      BusinessException.invalidMonitorKey(key);
    }
    // updated
    this[key] = val;
    // 返回实例对象
    return this;
  }

  constructor(serialNumber) {
    this.setActuator(Actuator.SERIAL_NUMBER, serialNumber);
  }
}

export default Actuator;
