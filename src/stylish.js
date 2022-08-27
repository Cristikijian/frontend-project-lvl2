import _ from 'lodash';
import { ADD_TYPE, DELETE_TYPE, NONE_TYPE } from './constants.js';

const getIndent = (depth, type) => {
  const spaceMultiplier = 4;
  const spaceNumber = spaceMultiplier * depth;
  if ((type === ADD_TYPE || type === DELETE_TYPE) && depth !== 1) {
    return ' '.repeat(spaceNumber + 2);
  }
  if (depth === 0) {
    return ' '.repeat(spaceMultiplier - 2);
  }
  return ' '.repeat(spaceNumber + 2);
};

const openingSymbol = '{';
const closingSymbol = '}';

const formatPlainObject = (content, deepLevel) => {
  const objectContent = Object.entries(content);
  return objectContent
    .reduce((result, [key, value]) => {
      if (!_.isObject(value)) {
        return result.concat(`${getIndent(deepLevel, NONE_TYPE)}${key}: ${value}\n`);
      }
      return result.concat(`${getIndent(deepLevel, NONE_TYPE)}${key}: ${openingSymbol}\n${formatPlainObject(value, deepLevel + 1)}\n${getIndent(deepLevel, NONE_TYPE)}${closingSymbol}\n`);
    }, '');
};

const formatDiffEntries = (diffEntries = [], formattingLevel = 0) => {
  let resultContent = '{\n';

  resultContent += diffEntries
    .reduce((result, {
      label, value, type, isObject,
    }) => {
      const openingBlock = `${getIndent(formattingLevel, type)}${type} ${label}: `;
      // const closingBlock = `${spaceSymbol}  ${closingSymbol}\n`;

      if (Array.isArray(value)) {
        // eslint-disable-next-line max-len
        return result.concat(openingBlock, formatDiffEntries(value, formattingLevel + 1), '\n');
      }
      if (isObject) {
        return result.concat(openingBlock, `${openingSymbol}\n`, formatPlainObject(value, formattingLevel + 1), `${getIndent(formattingLevel, type)}${closingSymbol}\n`);
      }

      return result.concat(`${openingBlock}${value}\n`);
    }, '');
  return resultContent.concat(`${formattingLevel === 0 ? '' : getIndent(formattingLevel, NONE_TYPE)}${closingSymbol}`);
};
export default formatDiffEntries;
