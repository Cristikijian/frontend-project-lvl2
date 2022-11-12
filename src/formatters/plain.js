import _ from 'lodash';

import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE, NESTED_TYPE,
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
  .map((diffEntry) => {
    const currentPath = [...path, diffEntry.key];

    switch (diffEntry.type) {
      case NESTED_TYPE:
        return formatPlain(diffEntry.children, currentPath);
      case ADDED_TYPE:
        return `Property '${currentPath.join('.')}' was added with value: ${formatValue(diffEntry.value)}`;
      case DELETED_TYPE:
        return `Property '${currentPath.join('.')}' was removed`;
      case UPDATED_TYPE:
        return `Property '${currentPath.join('.')}' was updated. From ${formatValue(diffEntry.value1)} to ${formatValue(diffEntry.value2)}`;
      default:
        return null;
    }
  })
  .filter(Boolean)
  .join('\n');

export default formatPlain;
