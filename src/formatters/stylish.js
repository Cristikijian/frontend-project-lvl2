import _ from 'lodash';
import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE, NESTED_TYPE,
} from '../constants.js';

const SPACES_COUNT = 4;

const getIndent = (depth, isClosing) => {
  const spaceNumber = SPACES_COUNT * depth - (isClosing ? 4 : 2);
  return ' '.repeat(spaceNumber);
};

const getTypeSymbol = (type) => {
  switch (type) {
    case ADDED_TYPE:
      return '+';
    case DELETED_TYPE:
      return '-';
    default:
      return ' ';
  }
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const resultContent = Object.entries(data)
    .map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${getIndent(depth)}  ${key}: ${value}\n`;
      }

      return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}\n`;
    })
    .join('');

  return `{\n${resultContent}${getIndent(depth, true)}}`;
};

const formatStylish = (diffEntries = [], depth = 1) => {
  const resultContent = diffEntries
    .map((diffEntry) => {
      switch (diffEntry.type) {
        case UPDATED_TYPE: {
          const deleted = `${getIndent(depth)}- ${diffEntry.key}: ${stringify(diffEntry.value1, depth + 1)}\n`;
          const added = `${getIndent(depth)}+ ${diffEntry.key}: ${stringify(diffEntry.value2, depth + 1)}\n`;
          return deleted + added;
        }
        case NESTED_TYPE: {
          return `${getIndent(depth)}  ${diffEntry.key}: ${formatStylish(diffEntry.children, depth + 1)}\n`;
        }
        default: {
          return `${getIndent(depth)}${getTypeSymbol(diffEntry.type)} ${diffEntry.key}: ${stringify(diffEntry.value, depth + 1)}\n`;
        }
      }
    })
    .flat()
    .join('');

  return ['{\n', ...resultContent, `${depth === 1 ? '' : getIndent(depth, true)}}`].join('');
};

export default formatStylish;
