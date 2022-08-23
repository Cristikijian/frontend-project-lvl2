import _ from 'lodash';

const openingSymbol = '{';
const closingSymbol = '}';

const formatPlainObject = (content, level) => {
  const objectContent = Object.entries(content);
  const spaceSymbol = ' '.repeat((4 * level));

  return objectContent
    .reduce((result, [key, value]) => {
      if (!_.isObject(value)) {
        return result.concat(`${spaceSymbol}${key}: ${value}\n`);
      }
      return result.concat(`${spaceSymbol}${key}: {\n${formatPlainObject(value, level + 1)}${spaceSymbol}}\n`);
    }, '');
};

const formatDiffEntries = (diffEntries = []) => diffEntries
  .reduce((result, {
    label, value, type, level, isObject,
  }) => {
    const spaceSymbol = ' '.repeat((4 * level));
    const openingBlock = `${spaceSymbol}${type} ${label}: ${openingSymbol}\n`;
    const closingBlock = `${spaceSymbol}  ${closingSymbol}\n`;

    if (Array.isArray(value)) {
      return result.concat(openingBlock, formatDiffEntries(value), closingBlock);
    }
    if (isObject) {
      return result.concat(openingBlock, formatPlainObject(value, level + 1), closingBlock);
    }

    return result.concat(`${spaceSymbol}${type} ${label}: ${value}\n`);
  }, '');
export default formatDiffEntries;
