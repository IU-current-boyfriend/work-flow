import _ from "lodash";
import { v4 } from "uuid";

/**
 * 合并对象
 * @param {*} v1
 * @param {*} v2
 * @returns v1
 */
const merge = (v1, v2) => {
  return _.merge(v1, v2);
};

/**
 * 判断值是否为null或者undefined
 * @param {*} v1 值
 * @returns
 */
const isNil = (v1) => {
  return _.isNil(v1);
};

/**
 * 深克隆
 * @param {*} v1 原值
 * @returns 新值
 */
const cloneDeep = (v1) => {
  return _.cloneDeep(v1);
};

/**
 * 空数组
 * @param {*} array
 * @returns
 */
const arrayIsEmpty = (array) => {
  return Array.isArray(array) && array.length === 0;
};

/**
 * 获取uuid
 * @returns 返回uuid v4字符串
 */
const getUUID = () => {
  return v4();
};

// 判断 索引index 对于数组arr是否越界
const isIndexOutOfBounds = (arr, index) => {
  // 越界的判定条件：索引<0  或  索引≥数组长度
  return index < 0 || index >= arr.length;
};

/**
 * 根据索引值移除数组中的元素
 * @param {*} index 索引值
 */
const arrayRemoveElement = (arr, index) => {
  return _.remove(arr, (n, i) => i !== index);
};

/**
 * 判断该值是否为true or false or undefined
 */
const isBooleanAndUndefined = (val) => {
  if (val === undefined) return true;
  return _.isBoolean(val);
};

/**
 * 判断是否是对象
 * @param {*} val 值
 * @returns boolean
 */
const isObject = (val) => {
  return _.isObject(val);
};

/**
 * 判断是否是普通对象
 * @param {*} val 值
 * @returns boolean
 */
const isPlainObject = (val) => {
  return _.isPlainObject(val);
};

/**
 * 判断是否是数组
 * @param {*} val 需要判断的值
 * @returns boolean
 */
const isArray = (val) => {
  return _.isArray(val);
};

/**
 * 返回对象本身可枚举的属性
 * @param {*} origin 源对象
 * @returns 自身可枚举属性集合
 */
const forOwn = (origin) => {
  if (!isObject(origin)) return null;
  // 创建属性集合
  const properties = [];
  _.forOwn(origin, (v, k) => {
    properties.push(k);
  });
  return properties;
};

/**
 * 源数组根据目标顺序进行重排
 * @param {*} t 目标顺序
 * @param {*} o 原数组
 * @returns 排序后的数组
 */
const unionSort = (t, o) => {
  // 如果二者其一不是数组，则返回原数组
  if (!isArray(t) || !isArray(o)) return o;
  // 根据正确的顺序,设置顺序
  const reduceO = o.reduce((r, c) => {
    const index = t.findIndex(
      (v) => v.toLocaleUpperCase() === c.toLocaleUpperCase()
    );
    if (index != -1) r[c] = index;
    else r[c] = Infinity;
    return r;
  }, {});

  // 按照正确的顺序升序
  return Object.entries(reduceO)
    .sort(([k1, v1], [k2, v2]) => v1 - v2)
    .map(([k]) => k);
};

/**
 * 判断是否为空字符串
 * @param {*} str 字符串
 * @returns boolean
 */
const isEmptyString = (str) => _.isEqual(str, "");

/**
 * 获取对象自身可枚举的键名集合
 * @param {*} val
 * @returns
 */
const keys = (val, collect = []) => {
  _.toPairs(val).forEach(([k, v]) => {
    if (isPlainObject(v)) keys(v, collect);
    else collect.push(k);
  });
  return collect;
};

/**
 * 判断是否为函数
 * @param {*} val
 * @returns
 */
const isFunction = (val) => {
  return _.isFunction(val);
};

/**
 * 合并数组
 * @param {*} array  被连接的数组
 * @param  {...any} args 连接的值
 * @returns 新的数据
 */
const concat = (array, ...args) => {
  return _.concat(array, args);
};

/**
 * 截流函数
 * @param {*} func
 * @param {*} delay
 * @returns
 */
const throttle = (func, delay) => {
  return _.throttle(func, delay);
};

export {
  keys,
  merge,
  isNil,
  concat,
  forOwn,
  isArray,
  getUUID,
  throttle,
  cloneDeep,
  unionSort,
  isFunction,
  arrayIsEmpty,
  isEmptyString,
  isPlainObject,
  arrayRemoveElement,
  isIndexOutOfBounds,
  isBooleanAndUndefined,
};
