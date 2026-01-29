import BaseTask from "./BaseTask";
import * as CONTANT from "./contant";
import { isNil, getUUID, cloneDeep, keys } from "./utils";

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
    start: undefined, // 抄送开始的索引数组（树型结构）
    end: undefined, // 抄送结束的索引数组（树型结构）
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
    if (!keys(this.notation).includes(key)) return;
    // updated
    this.notation[key] = val;
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
