import pkg from 'lodash';

const { isObject } = pkg;

const createDiffEntry = (label, value, type, level) => ({
  label,
  value,
  type,
  level,
  isObject: isObject(value),
});

export default createDiffEntry;
