// eslint-disable-next-line no-unused-vars
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from '../src/parsers.js';
import getPath from '../src/getPath.js';
import compareObjects from '../src/compareObjects.js';
import formatDiffEntries from '../src/stylish.js';
import plainFormatter from '../src/plain.js';

const firstObject = parseFile('./__fixtures__/file3.json');
const secondObject = parseFile('./__fixtures__/file4.json');
const filePath = '../__fixtures__/file1.json';
const diffResultEtalon = readFileSync(path.resolve('./__fixtures__/diffResult.txt'), 'utf-8');
const plainResultEtalon = readFileSync(path.resolve('./__fixtures__/plainResult.txt'), 'utf-8');
const jsonResultEtalon = readFileSync(path.resolve('./__fixtures__/jsonResult.txt'), 'utf-8');

test('getPath', () => {
  expect(getPath(filePath)).toEqual(path.resolve(process.cwd(), filePath));
  expect(getPath('')).toEqual(process.cwd());
});

test('formatDiffEntries', () => {
  expect(formatDiffEntries(compareObjects(firstObject, secondObject))).toEqual(diffResultEtalon);
});

test('plainFormatter', () => {
  expect(plainFormatter(compareObjects(firstObject, secondObject))).toEqual(plainResultEtalon);
});

test('jsonFormatter', () => {
  expect(JSON.stringify((compareObjects(firstObject, secondObject)), null, 2))
    .toEqual(jsonResultEtalon);
});
