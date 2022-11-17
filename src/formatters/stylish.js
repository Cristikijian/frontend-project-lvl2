import _ from 'lodash';
import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE, NESTED_TYPE, UNCHANGED_TYPE,
} from '../constants.js';

const SPACES_COUNT = 4;

const getIndent = (depth) => {
  if (depth < 1) return '';
  const spaceNumber = SPACES_COUNT * depth - 2;
  return ' '.repeat(spaceNumber);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}\n`)
    .join('');

  return `{\n${output}${getIndent(depth - 1)}  }`;
};

const formatStylish = (diffEntries = [], depth = 1) => {
  const resultContent = diffEntries
    .map((diffEntry) => {
      switch (diffEntry.type) {
        case UNCHANGED_TYPE: {
          return `${getIndent(depth)}  ${diffEntry.key}: ${stringify(diffEntry.value, depth)}`;
        }
        case UPDATED_TYPE: {
          const deleted = `${getIndent(depth)}- ${diffEntry.key}: ${stringify(diffEntry.value1, depth)}\n`;
          const added = `${getIndent(depth)}+ ${diffEntry.key}: ${stringify(diffEntry.value2, depth)}`;
          return deleted + added;
        }
        case ADDED_TYPE: {
          return `${getIndent(depth)}+ ${diffEntry.key}: ${stringify(diffEntry.value, depth)}`;
        }

        case DELETED_TYPE: {
          return `${getIndent(depth)}- ${diffEntry.key}: ${stringify(diffEntry.value, depth)}`;
        }

        case NESTED_TYPE: {
          return `${getIndent(depth)}  ${diffEntry.key}: ${formatStylish(diffEntry.children, depth + 1)}`;
        }

        default: {
          throw new Error((`Unknown type of node: ${diffEntry}`));
        }
      }
    })
    .flat()
    .join('\n');

  return ['{\n', ...resultContent, depth === 1 ? '' : `${getIndent(depth - 1)}  `].join('');
};

export default formatStylish;
