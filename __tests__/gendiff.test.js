// eslint-disable-next-line no-unused-vars
import { test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const getFixture = (filename) => readFileSync(new URL(`../__fixtures__/${filename}`, import.meta.url), 'utf-8');

test('genDiff stylish', () => {
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json')).toEqual(getFixture('stylishResult.txt'));
});

test('gendiff plain', () => {
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json', 'plain')).toEqual(getFixture('plainResult.txt'));
});

test('gendif json', () => {
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.json', 'json')).toEqual(getFixture('jsonResult.txt'));
});
