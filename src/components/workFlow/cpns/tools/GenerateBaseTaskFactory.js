import Assert from "./Assert";
import BaseTask from "./BaseTask";
import NormalTask from "./NormalTask";
import CustomerTask from "./CustomerTask";
import BusinessException from "./BusinessException";
import * as CONTANT from "./contant";

/**
 * 该类根据任务类型调用不同的任务参数工厂,生成不同的任务参数
 */
class GenerateBaseTaskFactory {
  /**
   * 任务工厂的映射
   * key: factoryMark
   * val: factory Class
   */
  static taskFactoryMap = new Map([
    [CONTANT.GENERAL_TASK, BaseTask],
    [CONTANT.NORMAL_TASK_FACTORY, NormalTask],
    [CONTANT.CUSTOMER_TASK_FACTORY, CustomerTask],
  ]);

  /**
   * 获取任务工厂的映射
   */
  static getTaskFactoryMap(factoryMark) {
    Assert.NonNullAndUndefined(factoryMark, "请按照规范选择工厂的类型...");
    // 如果不存在工厂,则抛出异常
    if (!this.taskFactoryMap.keys().toArray().includes(factoryMark)) {
      BusinessException.invalidFactoryException(factoryMark);
    }
    // 获取任务工厂实例对象
    const TaskFactoryInstance = this.taskFactoryMap.get(factoryMark);
    // 返回工厂实例对象
    return new TaskFactoryInstance();
  }

  /**
   * 根据工厂唯一标记获取工厂
   * @param {*} factoryMark
   * @returns 返回任务实例对象
   */
  static getTaskFactory(factoryMark) {
    return this.getTaskFactoryMap(factoryMark);
  }

  /**
   * 根据任务工厂的唯一标识,生成对应的任务参数
   * @param {*} factoryMark 工厂唯一标识
   */
  static generateTask(factoryMark) {
    return this.getTaskFactory(factoryMark);
  }
}

export default GenerateBaseTaskFactory;
