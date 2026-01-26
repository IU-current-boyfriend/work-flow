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
  actuators = null;
  // 扩展属性集合
  extensions = null;

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

  /**
   * 清除其它元素中的元素文档
   */
  clearElementDocument() {
    this.other.elementDocument = undefined;
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
   * 从扩展属性集合中移除扩展属性对象
   * @param {*} index 索引值
   */
  removeExtension(index) {
    // 如果集合为空或者不存在
    if (isNil(this.extensions) || arrayIsEmpty(this.extensions)) {
      // 无效的移除
      BusinessException.invalidExtensionRemove();
    }
    // 处理索引越界的问题
    if (isIndexOutOfBounds(this.extensions, index)) {
      // 索引越界
      BusinessException.isIndexOutOfBounds(index);
    }
    // 删除扩展属性
    this.extensions = arrayRemoveElement(this.extensions, index);
    // 返回实例对象
    return this;
  }

  /**
   * 根据索引从扩展属性集合中获取扩展属性对象
   * @param {*} index 索引
   * @returns extension instance
   */
  getExtensionByIndex(index) {
    // 如果集合为空或者不存在
    if (isNil(this.extensions) || arrayIsEmpty(this.extensions)) return null;
    // 处理索引越界的问题
    if (isIndexOutOfBounds(this.extensions, index)) return null;
    // 返回对象extension instance实例对象
    return this.extensions[index];
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
   * 从监听器集合中移除监听器对象
   * @param {*} index 索引值
   */
  removeActuator(index) {
    // 如果集合为空或者不存在
    if (isNil(this.actuators) || arrayIsEmpty(this.actuators)) {
      // 无效的移除
      BusinessException.invalidMonitorRemove();
    }
    // 处理索引越界的问题
    if (isIndexOutOfBounds(this.actuators, index)) {
      // 索引越界
      BusinessException.isIndexOutOfBounds(index);
    }
    // 删除监听器
    this.actuators = arrayRemoveElement(this.actuators, index);
    // 返回实例对象
    return this;
  }

  /**
   * 获取常规对象属性值
   * @param {*} key key存在获取属性值 key不存在获取常规对象本身
   */
  getGeneral(key) {
    // key => undefined || null
    if (isNil(key)) return cloneDeep(this.general);
    // key => !undefined || !null
    return cloneDeep(this.general[key]);
  }

  /**
   * 根据索引从监听器集合中获取监听器对象
   * @param {*} index 索引
   * @returns Actuactor instance
   */

  getActuactorByIndex(index) {
    // 如果集合为空或者不存在
    if (isNil(this.actuators) || arrayIsEmpty(this.actuator)) return null;
    // 处理索引越界的问题
    if (isIndexOutOfBounds(this.actuators, index)) return null;
    // 返回对象Actuactor instance实例对象
    return this.actuators[index];
  }

  /**
   * 获取监听器集合
   */
  getActuactors() {
    return cloneDeep(this.actuators);
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

  /**
   * 初始化监听器集合
   */
  initActuactors() {
    this.actuators = Array.of();
  }

  /**
   * 初始化扩展属性集合
   */
  initExtension() {
    this.extensions = Array.of();
  }

  // 构造函数
  constructor() {
    this.initGeneral();
    this.initActuactors();
    this.initExtension();
  }
}

export default BaseTask;
