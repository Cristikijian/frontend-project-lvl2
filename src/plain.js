import _ from 'lodash';
import pkg from 'lodash';

import { ADD_TYPE, DELETE_TYPE, NONE_TYPE } from './constants.js';

const { isObject } = pkg;

const isComplex = (value) => {
  let checkComplex = '';
  if (Array.isArray(value) || _.isObject(value)) {
    checkComplex = '[complex value] ';
    return checkComplex;
  }
  return value;
};

const plainFormatter = (diffEntries, path = []) => {
  let resultContent = '';

  resultContent += diffEntries
    .reduce((result, {
      label, value, type, isObject, oldValue,
    }) => {
      const currentPath = [...path, label];

      if (Array.isArray(value)) {
        return result.concat(plainFormatter(value, currentPath));
      }

      // console.log('current path', currentPath);
      // console.log('diff entry: ', label, type, value, oldValue);

      // if (type === NONE_TYPE && !oldValue) {
      //   return result.concat('');
      // }
      if (type === DELETE_TYPE) {
        return result.concat(`Property '${currentPath.join('.')}' was removed\n`);
      }
      if (type === ADD_TYPE && oldValue !== undefined) {
        return result.concat(`Property '${currentPath.join('.')}' was updated. From ${isComplex(oldValue)} to ${isComplex(value)}\n`);
      }
      if (type === ADD_TYPE && oldValue === undefined) {
        return result.concat(`Property '${currentPath.join('.')}' was added with value: ${isComplex(value)}\n`);
      }
      return result;
    }, '');
  return resultContent;
};

export default plainFormatter;
