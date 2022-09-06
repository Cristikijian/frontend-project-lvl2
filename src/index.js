import _ from 'lodash';
import {
  ADD_TYPE, DELETE_TYPE, NONE_TYPE, UPDATED_TYPE,
} from './constants.js';
import createDiffEntry from './createDiffEntry.js';

const getDiff = (obj1, obj2) => {
  const result = Object.entries(obj1)
    .reduce((changes, [key, oldValue]) => {
      const newValue = obj2[key];

      if (_.isObject(oldValue) && _.isObject(newValue)) {
        const objectsDiffResult = getDiff(oldValue, newValue);
        changes.push(createDiffEntry(key, objectsDiffResult, NONE_TYPE));
        return changes;
      }

      if (!Object.hasOwn(obj2, key)) {
        changes.push(createDiffEntry(key, oldValue, DELETE_TYPE));
      }

      if (Object.hasOwn(obj2, key) && oldValue !== newValue) {
        changes.push(createDiffEntry(key, newValue, UPDATED_TYPE, oldValue));
        // changes.push(createDiffEntry(key, newValue, UPDATED_TYPE));
      }

      if (Object.hasOwn(obj2, key) && oldValue === newValue) {
        changes.push(createDiffEntry(key, oldValue, NONE_TYPE));
      }

      return changes;
    }, []);

  return Object.entries(obj2)
    .filter(([key]) => !Object.hasOwn(obj1, key))
    .reduce(
      (changes, [key, newValue]) => {
        changes.push(createDiffEntry(key, newValue, ADD_TYPE));
        return changes;
      },
      result,
    ).sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      }
      if (a.label < b.label) {
        return -1;
      }
      return 0;
    });
};

export default getDiff;
