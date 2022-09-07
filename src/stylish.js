import _ from 'lodash';
import {
  ADD_TYPE, DELETE_TYPE, UPDATED_TYPE,
} from './constants.js';

const SPACE_MULTIPLIER = 4;
const openingSymbol = '{';
const closingSymbol = '}';

const getIndent = (depth, isClosing) => {
  const spaceNumber = SPACE_MULTIPLIER * depth - (isClosing ? 4 : 2);
  return ' '.repeat(spaceNumber);
};

const checkTypeSymbol = (type) => {
  switch (type) {
    case ADD_TYPE:
      return '+';
    case DELETE_TYPE:
      return '-';
    default:
      return ' ';
  }
};
const formatLabel = (label, depth, type = ' ') => `${getIndent(depth)}${checkTypeSymbol(type)} ${label}: `;

const formatPlainObject = (content, depth) => {
  const resultContent = Object.entries(content)
    .reduce((result, [key, value]) => {
      const openingBlock = formatLabel(key, depth);

      if (!_.isObject(value)) {
        return result.concat(openingBlock, value, '\n');
      }

      return result.concat(openingBlock, formatPlainObject(value, depth + 1), '\n');
    }, '');

  return [`${openingSymbol}\n`, resultContent, `${getIndent(depth, true)}${closingSymbol}`].join('');
};

const formatDiffEntries = (diffEntries = [], depth = 1) => {
  const resultContent = diffEntries
    .reduce((result, {
      label, value, type, isObject, oldValue,
    }) => {
      const openingBlock = formatLabel(label, depth, type);

      if (type === UPDATED_TYPE) {
        return result.concat(
          formatLabel(label, depth, DELETE_TYPE),
          _.isObject(oldValue) ? formatPlainObject(oldValue, depth + 1) : oldValue,
          '\n',
          formatLabel(label, depth, ADD_TYPE),
          _.isObject(value) ? formatPlainObject(value, depth + 1) : value,
          '\n',
        );
      }

      // or modified object (diff entries recursion)
      if (Array.isArray(value)) {
        return result.concat(openingBlock, formatDiffEntries(value, depth + 1), '\n');
      // or added/removed object (plain object recursion)
      }
      if (isObject) {
        return result.concat(openingBlock, formatPlainObject(value, depth + 1), '\n');
      }
      return result.concat(openingBlock, value, '\n');
    }, '');

  return [`${openingSymbol}\n`, resultContent, `${depth === 1 ? '' : getIndent(depth, true)}${closingSymbol}`].join('');
};

export default formatDiffEntries;
