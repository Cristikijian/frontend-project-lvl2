import pkg from 'lodash';

const { isObject } = pkg;

const createDiffEntry = (label, value, type, oldValue) => ({
  label,
  value,
  type,
  isObject: isObject(value),
  oldValue,
});

export default createDiffEntry;
