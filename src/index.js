import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getPath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

const getFormat = (filePath) => path.extname(filePath);

const getData = (filePath) => parse(readFileSync(filePath, 'utf-8'), getFormat(filePath));

const genDiff = (filePath1, filePath2, output) => format(
  output,
  buildTree(
    getData(
      getPath(filePath1),
    ),
    getData(
      getPath(filePath2),
    ),
  ),
);
export default genDiff;
