// eslint-disable-next-line no-unused-vars
import path from 'path';
import getPath from '../src/getPath.js';
import { getDiff } from '../index.js';

const filePath = ('/__fixtures__/file1.json');

test('getPath', () => {
  expect(getPath(filePath)).toEqual(path.resolve(process.cwd(), filePath));
  expect(getPath('')).toEqual(process.cwd());
});
