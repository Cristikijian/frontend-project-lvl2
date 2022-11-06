import _ from 'lodash';

import {
  ADD_TYPE, DELETE_TYPE, UPDATED_TYPE,
} from '../constants.js';

const formatValue = (value) => {
  if (Array.isArray(value) || _.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatter = (diffEntries, path = []) => diffEntries
  .reduce((result, diffEntry) => {
    const currentPath = [...path, diffEntry.key];

    if (diffEntry.children) {
      return result.concat(plainFormatter(diffEntry.children, currentPath));
    }

    if (diffEntry.type === DELETE_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was removed`);
    }

    if (diffEntry.type === ADD_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was added with value: ${formatValue(diffEntry.value)}`);
    }

    if (diffEntry.type === UPDATED_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was updated. From ${formatValue(diffEntry.value1)} to ${formatValue(diffEntry.value2)}`);
    }

    return result;
  }, [])
  .join('\n');

export default plainFormatter;
