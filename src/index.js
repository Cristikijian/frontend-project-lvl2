import parseFile from './parsers.js';
import compareObjects from './compareObjects.js';
import plainFormatter from './plain.js';
import formatDiffEntries from './stylish.js';

const genDiff = (firstFilePath, secondFilePath, options = {}) => {
  const firstObject = parseFile(firstFilePath);
  const secondObject = parseFile(secondFilePath);
  const diffData = compareObjects(firstObject, secondObject);
  if (options.format === 'plain') {
    return plainFormatter(diffData);
  } if (options.format === 'json') {
    return JSON.stringify(diffData, null, 2);
  }
  return formatDiffEntries(diffData);
};

export default genDiff;
