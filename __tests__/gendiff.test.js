// eslint-disable-next-line no-unused-vars
import { getPath, getFilesContent, getDiff } from '../index.js';

test('getPath', () => {
  expect(getPath('hello')).toEqual('olleh');
  expect(getPath('')).toEqual('');
});
