// eslint-disable-next-line no-unused-vars
import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFixture('stylishResult.txt');
const plainResult = readFixture('plainResult.txt');
const jsonResult = readFixture('jsonResult.txt');

describe('should be work with yml', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');

  test('without formatter', () => {
    expect(genDiff(file1, file2)).toEqual(stylishResult);
  });

  test('stylish formatter', () => {
    expect(genDiff(file1, file2, 'stylish')).toEqual(stylishResult);
  });

  test('plain formatter', () => {
    expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
  });

  test('json formatter', () => {
    expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
  });
});

describe('should be work with json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  test('without formatter', () => {
    expect(genDiff(file1, file2)).toEqual(stylishResult);
  });

  test('stylish formatter', () => {
    expect(genDiff(file1, file2, 'stylish')).toEqual(stylishResult);
  });

  test('plain formatter', () => {
    expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
  });

  test('json formatter', () => {
    expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
  });

  test('json error', () => {
    expect(() => genDiff(getFixturePath('error.json'), file1)).toThrow(SyntaxError);
  });
});
