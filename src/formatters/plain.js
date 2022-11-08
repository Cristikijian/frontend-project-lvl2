import _ from 'lodash';

import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE,
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

const formatPlain = (diffEntries, path = []) => diffEntries
  .reduce((result, diffEntry) => {
    const currentPath = [...path, diffEntry.key];

    if (diffEntry.children) {
      return result.concat(formatPlain(diffEntry.children, currentPath));
    }

    if (diffEntry.type === DELETED_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was removed`);
    }

    if (diffEntry.type === ADDED_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was added with value: ${formatValue(diffEntry.value)}`);
    }

    if (diffEntry.type === UPDATED_TYPE) {
      return result.concat(`Property '${currentPath.join('.')}' was updated. From ${formatValue(diffEntry.value1)} to ${formatValue(diffEntry.value2)}`);
    }

    return result;
  }, [])
  .join('\n');

export default formatPlain;
