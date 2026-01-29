/**
 * 抽离基础的任务数据实例对象属性或者方法
 */

import {
  isNil,
  getUUID,
  cloneDeep,
  arrayIsEmpty,
  arrayRemoveElement,
  isIndexOutOfBounds,
} from "./utils";
import * as CONTANT from "./contant";
import Assert from "./Assert";
import Actuator from "./Actuator";
import Extension from "./Extension";
import BusinessException from "./BusinessException";

class BaseTask {
  // 常规
  general = {
    id: undefined,
    name: undefined,
    mark: undefined,
  };

  // 执行监听器集合
  actuators = [];
  // 扩展属性集合
  extensions = [];

  // 其它
  other = {
    elementDocument: undefined, // 文档元素
  };

  /**
   * 设置其它对象中的元素文档
   * @param {*} val 值
   */
  setElementDocument(val) {
    this.other.elementDocument = val;
  }

  getActuators() {
    return this.actuators;
  }

  /**
   * 添加扩展属性：
   *  1. 创建扩展对象
   *  2. 将扩展对象添加到扩展对象集合中
   *  3. 返回实例对象
   */
  addExtension() {
    // 定义扩展集合长度
    let extensionsIndex = undefined;
    // 获取扩展属性集合
    const extensions = this.extensions;
    if (!extensions) extensionsIndex = 0;
    else extensionsIndex = extensions.length;
    // 扩展属性集合存在,兼容
    if (extensions) {
      // 创建扩展对象集合
      const extension = new Extension(extensionsIndex);
      // 添加扩展集合
      extensions.push(extension);
    }
    // 返回实例对象
    return this;
  }

  /**
   * 添加执行器:
   *  1. 创建执行器
   *  2. 将执行器添加到执行器集合中
   *  3. 返回实例对象
   *
   */
  addActuator() {
    // 定义监听器集合长度
    let actuatorsIndex = undefined;
    // 获取监听器集合
    const actuators = this.actuators;
    if (!actuators) actuatorsIndex = 0;
    else actuatorsIndex = actuators.length;
    // 监听器集合存在,兼容一下
    if (actuators) {
      // 创建监听器对象
      const actuator = new Actuator(actuatorsIndex);
      // 添加监听器对象
      actuators.push(actuator);
    }
    // 返回实例对象
    return this;
  }

  /**
   * 设置常规对象属性值
   * @param {*} key 属性键
   * @param {*} val 属性值
   */
  setGeneral(key, val) {
    // key === null || undefined
    if (!key) this.general = val;
    else this.general[key] = val;
    // chain call method
    return this;
  }

  initGeneral() {
    // 生成唯一UUID
    const uuid = getUUID();
    // 设置id、name
    this.setGeneral("id", `${CONTANT.PROCESS}${uuid}`).setGeneral(
      "name",
      `${CONTANT.PROCESS_NAME}${uuid}`
    );
  }

  // 构造函数
  constructor() {
    this.initGeneral();
  }
}

export default BaseTask;
