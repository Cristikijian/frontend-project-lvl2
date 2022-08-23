import _ from 'lodash';
import { ADD_TYPE, DELETE_TYPE, NONE_TYPE } from './src/constants.js';
import createDiffEntry from './src/createDiffEntry.js';

const getDiff = (obj1, obj2, level = 1) => {
  const result = Object.entries(obj1)
    .reduce((changes, [key, oldValue]) => {
      const newValue = obj2[key];

      if (_.isObject(oldValue) && _.isObject(newValue)) {
        const objectsDiffResult = getDiff(oldValue, newValue, level + 1);
        changes.push(createDiffEntry(key, objectsDiffResult, NONE_TYPE, level));
        return changes;
      }

      if (!Object.hasOwn(obj2, key)) {
        changes.push(createDiffEntry(key, oldValue, DELETE_TYPE, level));
      }

      if (Object.hasOwn(obj2, key) && oldValue !== newValue) {
        changes.push(createDiffEntry(key, newValue, ADD_TYPE, level));
        changes.push(createDiffEntry(key, oldValue, DELETE_TYPE, level));
      }

      if (Object.hasOwn(obj2, key) && oldValue === newValue) {
        changes.push(createDiffEntry(key, oldValue, NONE_TYPE, level));
      }

      return changes;
    }, []);

  return Object.entries(obj2)
    .filter(([key]) => !Object.hasOwn(obj1, key))
    .reduce(
      (changes, [key, newValue]) => {
        changes.push(createDiffEntry(key, newValue, ADD_TYPE, level));
        return changes;
      },
      result,
    );
};

// eslint-disable-next-line import/prefer-default-export
export { getDiff };
