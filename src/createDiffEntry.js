import pkg from 'lodash';

const { isObject } = pkg;

const createDiffEntry = (label, value, type) => ({
  label,
  value,
  type,
  isObject: isObject(value),
});

export default createDiffEntry;
