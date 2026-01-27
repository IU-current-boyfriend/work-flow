import BusinessException from "./BusinessException.js";
import { arrayRemoveElement, cloneDeep, keys } from "./utils.js";

/**
 * 监听器数据实例对象
 */

class Actuator {
  /**
   * 常量键名
   */
  static SERIAL_NUMBER_KEY = "serialNumber";
  static FIELDS_KEY = "fields";

  // 执行监听器单体对象
  actuator = {
    [Actuator.SERIAL_NUMBER_KEY]: undefined, // 执行器序号
    eventType: undefined, // 事件
    choseClass: undefined, // 选择类
    clazz: undefined, // 类
    [Actuator.FIELDS_KEY]: null, // 注入的字段
  };

  // 执行器注入字段
  actuatorField = {
    [Actuator.SERIAL_NUMBER_KEY]: undefined, // 字段序号
    name: undefined, // 字段名称
    type: undefined, // 字段类型
    express: undefined, // 字段表达式/字段值
  };

  /**
   * 返回监听器对象
   * @returns 监听器对象
   */
  getActuator() {
    return cloneDeep(this.actuator);
  }

  /**
   * 获取监听器对象的注入字段对象
   * @returns 注入字段对象
   */
  getActuatorField() {
    return cloneDeep(this.actuatorField);
  }

  /**
   * 从监听器对象集合中移除监听器注入字段对象
   * @param {*} index 索引值
   */
  removeActuatorField(index) {
    // 如果集合为空或者不存在
    if (
      isNil(this.actuator[Actuator.FIELDS_KEY]) ||
      arrayIsEmpty(this.actuator[Actuator.FIELDS_KEY])
    ) {
      // 无效的移除
      BusinessException.invalidMonitorRemove();
    }
    // 处理索引越界的问题
    if (isIndexOutOfBounds(this.actuator[Actuator.FIELDS_KEY], index)) {
      // 索引越界
      BusinessException.isIndexOutOfBounds(index);
    }
    // 删除监听器注入字段对象
    this.setActuator(
      Actuator.FIELDS_KEY,
      arrayRemoveElement(this.actuator[Actuator.FIELDS_KEY], index)
    );
    // 返回实例对象
    return this;
  }

  /**
   * 监听器中添加注入字段对象接口
   */
  addActuatorField() {
    // 声明注入字段序列化编号
    let fieldSerialNumber = undefined;
    // 获取当前监听器注入字段对象
    const actuatorFields = this.actuator.fields;
    // 判断当前集合是否为数组
    if (Array.isArray(actuatorFields))
      fieldSerialNumber = actuatorFields.length;
    else fieldSerialNumber = 0;
    // 做一下注入容器异常为null的容错
    if (this.actuator[Actuator.FIELDS_KEY]) {
      // 创建一个全新的注入字段对象
      const actuatorField = cloneDeep(this.actuatorField);
      // 设置注入字段对象的序号
      this.setActuatorField(Actuator.SERIAL_NUMBER_KEY, fieldSerialNumber);
      // 添加到监听器对象中
      this.setActuator(Actuator.FIELDS_KEY, [
        ...this.actuator[Actuator.FIELDS_KEY],
        actuatorField,
      ]);
    }
  }

  /**
   * 设置监听器注入字段属性
   * @param {*} key 建名
   * @param {*} val 键值
   */
  setActuatorField(key, val) {
    // 非法的键名更新
    if (!keys(this.actuatorField).includes(key)) {
      BusinessException.invalidMonitorFieldKey(key);
    }
    // updated
    this.actuatorField[key] = val;
    // 返回实例对象
    return this;
  }

  /**
   * 设置监听器属性
   * @param {*} key 键名
   * @param {*} val 键值
   */
  setActuator(key, val) {
    // 非法的键名更新
    if (!keys(this.actuator).includes(key)) {
      BusinessException.invalidMonitorKey(key);
    }
    // updated
    this.actuator[key] = val;
    // 返回实例对象
    return this;
  }

  /**
   * 初始化监听器部分属性
   * @param {*} serialNumber 序列号
   */
  _initActuactor(serialNumber) {
    this.setActuator(Actuator.SERIAL_NUMBER_KEY, serialNumber);
    this.setActuator(Actuator.FIELDS_KEY, Array.of());
  }

  constructor(serialNumber) {
    // 初始化监听器序列号
    this._initActuactor(serialNumber);
  }
}

export default Actuator;
