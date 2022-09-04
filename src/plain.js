import _ from 'lodash';

import {
  ADD_TYPE, DELETE_TYPE, UPDATED_TYPE,
} from './constants.js';

const formatValue = (value) => {
  let checkComplex = '';
  if (Array.isArray(value) || _.isObject(value)) {
    checkComplex = '[complex value]';
    return checkComplex;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatter = (diffEntries, path = []) => diffEntries
  .reduce((result, {
    label, value, type, oldValue,
  }) => {
    const currentPath = [...path, label];

    if (Array.isArray(value)) {
      return result.concat(plainFormatter(value, currentPath));
    }

    if (type === DELETE_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was removed`);
    }

    if (type === ADD_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was added with value: ${formatValue(value)}`);
    }

    if (type === UPDATED_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`);
    }

    return result;
  }, [])
  .join('\n');

export default plainFormatter;
