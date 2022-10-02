// eslint-disable-next-line no-unused-vars
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const diffResultEtalon = readFileSync(path.resolve('./__fixtures__/stylishResult.txt'), 'utf-8');
const plainResultEtalon = readFileSync(path.resolve('./__fixtures__/plainResult.txt'), 'utf-8');
const jsonResultEtalon = readFileSync(path.resolve('./__fixtures__/jsonResult.txt'), 'utf-8');

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json')).toEqual(diffResultEtalon);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json', 'plain')).toEqual(plainResultEtalon);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json', 'json')).toEqual(jsonResultEtalon);
});
