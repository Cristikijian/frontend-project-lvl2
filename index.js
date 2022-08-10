import { ADD_TYPE, DELETE_TYPE, NONE_TYPE } from './src/constants.js';
import createDiffEntry from './src/createDiffEntry.js';

const getDiff = (obj1, obj2) => {
  const result = Object.entries(obj1)
    .reduce((changes, [key, oldValue]) => {
      if (!Object.hasOwn(obj2, key)) {
        changes.push(createDiffEntry(key, oldValue, DELETE_TYPE, 0));
      }

      const newValue = obj2[key];
      if (Object.hasOwn(obj2, key) && oldValue !== newValue) {
        changes.push(createDiffEntry(key, newValue, ADD_TYPE, 0));
        changes.push(createDiffEntry(key, oldValue, DELETE_TYPE, 0));
      }

      if (Object.hasOwn(obj2, key) && oldValue === newValue) {
        changes.push(createDiffEntry(key, oldValue, NONE_TYPE, 0));
      }
      return changes;
    }, []);

  return Object.entries(obj2)
    .filter(([key]) => !Object.hasOwn(obj1, key))
    .reduce(
      (changes, [key, newValue]) => {
        changes.push(createDiffEntry(key, newValue, ADD_TYPE, 0));
        return changes;
      },
      result,
    );
};

// eslint-disable-next-line import/prefer-default-export
export { getDiff };
