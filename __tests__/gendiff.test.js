// eslint-disable-next-line no-unused-vars
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from '../src/parsers.js';
import getPath from '../src/getPath.js';
import { getDiff } from '../index.js';
import formatDiffEntries from '../src/stylish.js';

const firstObject = parseFile('./__fixtures__/file3.json');
const secondObject = parseFile('./__fixtures__/file4.json');
const filePath = '/__fixtures__/file1.json';
const diffResultEtalon = readFileSync(path.resolve('./__fixtures__/diffresult.txt'), 'utf-8');

test('getPath', () => {
  expect(getPath(filePath)).toEqual(path.resolve(process.cwd(), filePath));
  expect(getPath('')).toEqual(process.cwd());
});

test('formatDiffEntries', () => {
  expect(formatDiffEntries(getDiff(firstObject, secondObject))).toEqual(diffResultEtalon);
});
