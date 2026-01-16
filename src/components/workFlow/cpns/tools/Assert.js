import { isNil } from "./utils";
class Assert {
  /**
   * 断言当前的值不是null或者undefined
   * @param {*} val 值
   * @param {*} errMsg 异常信息
   */
  static NonNullAndUndefined(val, errMsg) {
    // 断言当前值为null或者为undefined
    if (isNil(val)) {
      throw new Error(errMsg);
    }
  }
}

export default Assert;
