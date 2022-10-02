import parseFile from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const firstObject = parseFile(firstFilePath);
  const secondObject = parseFile(secondFilePath);
  const data = buildTree(firstObject, secondObject);
  return formatData(format, data);
};
export default genDiff;
