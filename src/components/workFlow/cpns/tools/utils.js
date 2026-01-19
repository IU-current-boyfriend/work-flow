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

export {
  merge,
  isNil,
  isArray,
  getUUID,
  cloneDeep,
  arrayIsEmpty,
  isPlainObject,
  arrayRemoveElement,
  isIndexOutOfBounds,
  isBooleanAndUndefined,
};
