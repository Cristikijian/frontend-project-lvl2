import yaml from 'js-yaml';
import path from 'path';
import getData from './getData.js';

const parseFile = (file) => {
  const content = getData(file);
  if (path.extname(file) === '.json') {
    return JSON.parse(content);
  }

  if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
    return yaml.load(content);
  }
  return false;
};

export default parseFile;
