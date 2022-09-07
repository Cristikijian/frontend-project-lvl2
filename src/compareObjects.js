import _ from 'lodash';
import {
  ADD_TYPE, DELETE_TYPE, NONE_TYPE, UPDATED_TYPE,
} from './constants.js';
import createDiffEntry from './createDiffEntry.js';

const compareObjects = (obj1, obj2) => {
  const result = Object.entries(obj1)
    .reduce((changes, [key, oldValue]) => {
      const newValue = obj2[key];

      if (_.isObject(oldValue) && _.isObject(newValue)) {
        const objectsDiffResult = compareObjects(oldValue, newValue);
        return [...changes, createDiffEntry(key, objectsDiffResult, NONE_TYPE)];
      }

      if (!Object.hasOwn(obj2, key)) {
        return [...changes, createDiffEntry(key, oldValue, DELETE_TYPE)];
      }

      if (Object.hasOwn(obj2, key) && oldValue !== newValue) {
        return [...changes, createDiffEntry(key, newValue, UPDATED_TYPE, oldValue)];
        // changes.push(createDiffEntry(key, newValue, UPDATED_TYPE));
      }

      if (Object.hasOwn(obj2, key) && oldValue === newValue) {
        return [...changes, createDiffEntry(key, oldValue, NONE_TYPE)];
      }

      return changes;
    }, []);

  const sortedResult = Object.entries(obj2)
    .filter(([key]) => !Object.hasOwn(obj1, key))
    .reduce(
      (changes, [key, newValue]) => [...changes, createDiffEntry(key, newValue, ADD_TYPE)],
      result,
    );
  return _.sortBy(sortedResult, (diffEntry) => diffEntry.label);
};

export default compareObjects;
