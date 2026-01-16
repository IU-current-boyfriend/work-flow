import { cloneDeep } from "./utils";

/**
 * 扩展属性数据对象
 */
class Extension {
  serialNumber = undefined; // 扩展属性序列号
  name = undefined; // 扩展属性名
  value = undefined; // 扩展属性值

  /**
   * 清空扩展对象中所有的属性
   * @returns 扩展实例对象
   */
  clear() {
    Object.keys(this).forEach((k) => {
      const key = k.replace(/(\w)/, (m, $1) => $1.toUpperCase());
      if (key && typeof this[`set${key}`] === "function") {
        this[`set${key}`].call(this, undefined);
      }
    });
    return this;
  }

  getSerialNumber() {
    return cloneDeep(this.serialNumber);
  }

  getName() {
    return cloneDeep(this.name);
  }

  getValue() {
    return cloneDeep(this.value);
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setValue(val) {
    this.value = val;
    return this;
  }

  setSerialNumber(number) {
    this.serialNumber = number;
    return this;
  }

  constructor(serialNumber) {
    this.setSerialNumber(serialNumber);
  }
}

export default Extension;
