import _ from 'lodash';

import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE, NESTED_TYPE,
} from '../constants.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (path, key) => [...path, key];

const formatPlain = (tree, path = []) => tree
  .map((node) => {
    switch (node.type) {
      case NESTED_TYPE:
        return formatPlain(node.children, getPath(path, node.key));
      case ADDED_TYPE:
        return `Property '${getPath(path, node.key).join('.')}' was added with value: ${stringify(node.value)}`;
      case DELETED_TYPE:
        return `Property '${getPath(path, node.key).join('.')}' was removed`;
      case UPDATED_TYPE:
        return `Property '${getPath(path, node.key).join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        return null;
    }
  })
  .filter(Boolean)
  .join('\n');

export default formatPlain;
