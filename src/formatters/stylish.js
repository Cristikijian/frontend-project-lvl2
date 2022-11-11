import _ from 'lodash';
import {
  ADDED_TYPE, DELETED_TYPE, UPDATED_TYPE,
} from '../constants.js';

const SPACES_COUNT = 4;
// const openingSymbol = '{';
// const closingSymbol = '}';

const getIndent = (depth, isClosing) => {
  const spaceNumber = SPACES_COUNT * depth - (isClosing ? 4 : 2);
  return ' '.repeat(spaceNumber);
};

const checkTypeSymbol = (type) => {
  switch (type) {
    case ADDED_TYPE:
      return '+';
    case DELETED_TYPE:
      return '-';
    default:
      return ' ';
  }
};
const formatLabel = (label, depth, type = ' ') => `${getIndent(depth)}${checkTypeSymbol(type)} ${label}: `;

const formatPlainObject = (content, depth) => {
  const resultContent = Object.entries(content)
    .map(([key, value]) => {
      const openingBlock = formatLabel(key, depth);

      if (!_.isObject(value)) {
        return `${openingBlock}${value}\n`;
      }

      return `${openingBlock}${formatPlainObject(value, depth + 1)}\n`;
    })
    .join('');

  return `{\n${resultContent}${getIndent(depth, true)}}`;
};

const formatStylish = (diffEntries = [], depth = 1) => {
  const resultContent = diffEntries
    .map((diffEntry) => {
      const openingBlock = formatLabel(diffEntry.key, depth, diffEntry.type);

      if (diffEntry.type === UPDATED_TYPE) {
        return [
          formatLabel(diffEntry.key, depth, DELETED_TYPE),
          // eslint-disable-next-line max-len
          _.isObject(diffEntry.value1) ? formatPlainObject(diffEntry.value1, depth + 1) : `${diffEntry.value1}`,
          '\n',
          formatLabel(diffEntry.key, depth, ADDED_TYPE),
          // eslint-disable-next-line max-len
          _.isObject(diffEntry.value2) ? formatPlainObject(diffEntry.value2, depth + 1) : `${diffEntry.value2}`,
          '\n',
        ];
      }

      // or modified object (diff entries recursion)
      if (diffEntry.children) {
        return [openingBlock, formatStylish(diffEntry.children, depth + 1), '\n'];
      // or added/removed object (plain object recursion)
      }
      if (_.isObject(diffEntry.value)) {
        return [openingBlock, formatPlainObject(diffEntry.value, depth + 1), '\n'];
      }
      return [openingBlock, `${diffEntry.value}`, '\n'];
    })
    .flat()
    .join('');

  return ['{\n', ...resultContent, `${depth === 1 ? '' : getIndent(depth, true)}}`].join('');
};

export default formatStylish;
