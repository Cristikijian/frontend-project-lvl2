import path from 'path';
import parseFile from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';
import getData from './getData.js';

const genDiff = (filePath1, filePath2, format) => {
  const fileFormat1 = path.extname(filePath1);
  const fileFormat2 = path.extname(filePath2);
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const object1 = parseFile(data1, fileFormat1);
  const object2 = parseFile(data2, fileFormat2);
  const data = buildTree(object1, object2);
  return formatData(format, data);
};
export default genDiff;
