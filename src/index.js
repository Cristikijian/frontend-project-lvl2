import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const buildPath = (filePath) => path.resolve(process.cwd(), filePath);
const extractFormat = (filePath) => path.extname(filePath).replace('.', '');

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));
const genDiff = (filePath1, filePath2, output = 'stylish') => {
  const data1 = getData(buildPath(filePath1));
  const data2 = getData(buildPath(filePath2));
  const tree = buildTree(data1, data2);
  return format(output, tree);
};
export default genDiff;
