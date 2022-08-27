import _ from 'lodash';
import { NONE_TYPE } from './constants.js';

const SPACE_MULTIPLIER = 4;
const openingSymbol = '{';
const closingSymbol = '}';

const getIndent = (depth, isClosing) => {
  const spaceNumber = SPACE_MULTIPLIER * depth - (isClosing ? 4 : 2);
  return ' '.repeat(spaceNumber);
};

const formatLabel = (label, depth, type = NONE_TYPE) => `${getIndent(depth)}${type} ${label}: `;

const formatPlainObject = (content, depth) => {
  let resultContent = `${openingSymbol}\n`;

  resultContent += Object.entries(content)
    .reduce((result, [key, value]) => {
      const openingBlock = formatLabel(key, depth);

      if (!_.isObject(value)) {
        return result.concat(openingBlock, value, '\n');
      }

      return result.concat(openingBlock, formatPlainObject(value, depth + 1), '\n');
    }, '');

  return resultContent.concat(`${getIndent(depth, true)}${closingSymbol}`);
};

const formatDiffEntries = (diffEntries = [], depth = 1) => {
  let resultContent = `${openingSymbol}\n`;

  resultContent += diffEntries
    .reduce((result, {
      label, value, type, isObject,
    }) => {
      const openingBlock = formatLabel(label, depth, type);

      // or modified object (diff entries recursion)
      if (Array.isArray(value)) {
        return result.concat(openingBlock, formatDiffEntries(value, depth + 1), '\n');
      // or added/removed object (plain object recursion)
      }
      if (isObject) {
        return result.concat(openingBlock, formatPlainObject(value, depth + 1), '\n');
      }
      // simple value
      return result.concat(openingBlock, value, '\n');
    }, '');

  return resultContent.concat(`${depth === 1 ? '' : getIndent(depth, true)}${closingSymbol}`);
};

export default formatDiffEntries;
