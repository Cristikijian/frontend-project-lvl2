import yaml from 'js-yaml';

const parseFile = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }

  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return false;
};

export default parseFile;
