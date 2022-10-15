import _ from 'lodash';
import {
  ADD_TYPE, DELETE_TYPE, NONE_TYPE, UPDATED_TYPE,
} from './constants.js';

const createDiffEntry = (label, value, type, oldValue) => ({
  label,
  value,
  type,
  isObject: _.isObject(value),
  oldValue,
});

const buildTree = (data1, data2) => {
  const result = _.uniq([...Object.keys(data1), ...Object.keys(data2)])
    .reduce((changes, key) => {
      const oldValue = data1[key];
      const newValue = data2[key];
      const keyExistsIn1 = Object.hasOwn(data1, key);
      const keyExistsIn2 = Object.hasOwn(data2, key);

      if (_.isObject(oldValue) && _.isObject(newValue)) {
        const objectsDiffResult = buildTree(oldValue, newValue);
        return [...changes, createDiffEntry(key, objectsDiffResult, NONE_TYPE)];
      }

      if (keyExistsIn1 && !keyExistsIn2) {
        return [...changes, createDiffEntry(key, oldValue, DELETE_TYPE)];
      }

      if (!keyExistsIn1 && keyExistsIn2) {
        return [...changes, createDiffEntry(key, newValue, ADD_TYPE)];
      }

      if (keyExistsIn1 && keyExistsIn2) {
        return oldValue === newValue
          ? [...changes, createDiffEntry(key, oldValue, NONE_TYPE)]
          : [...changes, createDiffEntry(key, newValue, UPDATED_TYPE, oldValue)];
      }

      return changes;
    }, []);

  return _.sortBy(result, (diffEntry) => diffEntry.label);
};

export default buildTree;
