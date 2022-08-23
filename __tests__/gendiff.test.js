// eslint-disable-next-line no-unused-vars
import path from 'path';
import getPath from '../src/getPath.js';
import { getDiff } from '../index.js';
import diffResult from '../__fixtures__/diffresult.js';

const filePath = ('/__fixtures__/file1.json');

test('getPath', () => {
  expect(getPath(filePath)).toEqual(path.resolve(process.cwd(), filePath));
  expect(getPath('')).toEqual(process.cwd());
});

test('getDiff', (file1, file2) => {
  expect(getDiff()).toEqual(path.resolve(process.cwd(), filePath));
  expect(getPath('')).toEqual(process.cwd());
});
