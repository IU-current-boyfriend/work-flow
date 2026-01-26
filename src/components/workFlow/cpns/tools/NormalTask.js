import BaseTask from "./BaseTask";
import * as CONTANT from "./contant";
import { isNil, getUUID, cloneDeep } from "./utils";

/**
 * 普通的任务流程数据类
 */
class NormalTask extends BaseTask {
  // 常规属性
  general = {
    id: undefined,
    name: undefined,
  };

  // 抄送提醒
  notation = {
    start: null, // 抄送开始的索引数组（树型结构）
    end: null, // 抄送结束的索引数组（树型结构）
  };

  /**
   * 设置抄送信息
   * @param {*} key 键名
   * @param {*} val 键值
   */
  setNotation(key, val) {
    // key == undefined || null
    if (isNil(key)) return;
    // key no exist
    if (!Object.keys().includes(key)) return;
    // updated
    this.notation[key] = val;
  }

  /**
   * 获取抄送提醒信息
   * @param {*} key 键名
   * @returns value or undefined(NonExist property) or null(exist property)
   */
  getNotation(key) {
    // key === null || undefined => get self
    if (isNil(key)) return cloneDeep(this.notation);
    // else return notation property
    return cloneDeep(this.notation[key]);
  }

  initGeneral() {
    // 初始化普通任务的id值
    this.setGeneral("id", `${CONTANT.ACTIVITY}${getUUID()}`);
  }

  init() {
    this.initGeneral();
  }

  // 构造方法
  constructor() {
    // 初始化父类
    super();
    // 初始化方法
    this.init();
  }
}

export default NormalTask;
