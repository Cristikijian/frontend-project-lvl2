import _ from 'lodash';
import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE, NESTED_TYPE, UNCHANGED_TYPE,
} from '../constants.js';

const SPACES_COUNT = 4;

const getIndent = (depth) => {
  if (depth < 1) return '';
  return ' '.repeat(SPACES_COUNT * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${output.join('\n')}\n${getIndent(depth)}  }`;
};

const iter = (nodes = [], depth = 1) => nodes.map((node) => {
  switch (node.type) {
    case UNCHANGED_TYPE: {
      return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    }
    case UPDATED_TYPE: {
      const output1 = `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const output2 = `${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${output1}\n${output2}`;
    }
    case ADDED_TYPE: {
      return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    }

    case DELETED_TYPE: {
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    }

    case NESTED_TYPE: {
      const output = iter(node.children, depth + 1);
      return `${getIndent(depth)}  ${node.key}: {\n${output.join('\n')}\n${getIndent(depth)}  }`;
    }

    default: {
      throw new Error((`Unknown type of node: ${node.type}`));
    }
  }
});

const formatStylish = (tree = [], depth = 1) => `{\n${iter(tree, depth).join('\n')}\n}`;

export default formatStylish;
