import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'node:fs';
import getPath from './getPath.js';

const parseFile = (file) => {
  const content = readFileSync(getPath(file), 'utf-8');
  if (path.extname(file) === '.json') {
    return JSON.parse(content);
  }

  if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
    return yaml.load(content);
  }
  return false;
};

export default parseFile;
