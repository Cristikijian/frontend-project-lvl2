import { expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFixture('stylishResult.txt');
const plainResult = readFixture('plainResult.txt');
const jsonResult = readFixture('jsonResult.txt');

describe('genDiff test', () => {
  it('should be work with yml', () => {
    const filePath1 = getFixturePath('file1.yaml');
    const filePath2 = getFixturePath('file2.yml');
    expect(genDiff(filePath1, filePath2)).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainResult);
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(jsonResult);
  });

  it('should be work with json', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    expect(genDiff(filePath1, filePath2)).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainResult);
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(jsonResult);
    expect(() => genDiff(getFixturePath('error.json'), filePath1)).toThrow(SyntaxError);
  });
});
