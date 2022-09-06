import parseFile from './parsers.js';
import compareObjects from './compareObjects.js';
import plainFormatter from './plain.js';
import formatDiffEntries from './stylish.js';

const genDiff = (firstFilePath, secondFilePath, options = {}) => {
  const firstObject = parseFile(firstFilePath);
  const secondObject = parseFile(secondFilePath);
  const diffData = compareObjects(firstObject, secondObject);
  if (options.format === 'plain') {
    console.log(plainFormatter(diffData));
  } else if (options.format === 'json') {
    console.log(JSON.stringify(diffData, null, 2));
  } else {
    console.log(formatDiffEntries(diffData));
  }
};

export default genDiff;
