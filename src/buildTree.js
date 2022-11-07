import _ from 'lodash';
import {
  ADD_TYPE, DELETE_TYPE, UNCHANGED_TYPE, UPDATED_TYPE,
} from './constants.js';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));
  return keys.map((key) => {
    const keyExistsIn1 = _.has(data1, key);
    const keyExistsIn2 = _.has(data2, key);

    if (!keyExistsIn1 && keyExistsIn2) {
      return { key, value: data2[key], type: ADD_TYPE };
    }

    if (keyExistsIn1 && !keyExistsIn2) {
      return { key, value: data1[key], type: DELETE_TYPE };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = buildTree(data1[key], data2[key]);
      return { key, children };
    }

    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: UNCHANGED_TYPE };
    }

    return {
      key, value1: data1[key], value2: data2[key], type: UPDATED_TYPE,
    };
  });
};

export default buildTree;
