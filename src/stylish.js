import _ from 'lodash';

const openingSymbol = '{';
const closingSymbol = '}';
const SPACE_MULTIPLIER = 2;

const formatPlainObject = (content, level) => {
  const objectContent = Object.entries(content);
  const spaceSymbol = ' '.repeat((SPACE_MULTIPLIER * level));

  return objectContent
    .reduce((result, [key, value]) => {
      if (!_.isObject(value)) {
        return result.concat(`${spaceSymbol}  ${key}: ${value}\n`);
      }
      return result.concat(`${spaceSymbol}  ${key}: ${openingSymbol}\n${formatPlainObject(value, level + 1)}${spaceSymbol}  ${closingSymbol}\n`);
    }, '');
};

const formatDiffEntries = (diffEntries = [], formattingLevel = 0) => {
  let resultContent = '{\n';
  resultContent += diffEntries
    .reduce((result, {
      label, value, type, level, isObject,
    }) => {
      const spaceSymbol = ' '.repeat(SPACE_MULTIPLIER * level);
      const openingBlock = `${spaceSymbol}${type} ${label}: `;
      // const closingBlock = `${spaceSymbol}  ${closingSymbol}\n`;

      if (Array.isArray(value)) {
        // eslint-disable-next-line max-len
        return result.concat(openingBlock, formatDiffEntries(value, formattingLevel + 1), '\n');
      }
      if (isObject) {
        return result.concat(openingBlock, `${openingSymbol}\n`, formatPlainObject(value, level + 1), `${spaceSymbol}  ${closingSymbol}\n`);
      }

      return result.concat(`${openingBlock}${value}\n`);
    }, '');
  return resultContent.concat(`${' '.repeat(SPACE_MULTIPLIER * formattingLevel)}  ${closingSymbol}`);
};
export default formatDiffEntries;
