import _ from 'lodash';
import {
  ADDED_TYPE, DELETED_TYPE, UNCHANGED_TYPE, UPDATED_TYPE, NESTED_TYPE,
} from './constants.js';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: ADDED_TYPE };
    }

    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: DELETED_TYPE };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = buildTree(data1[key], data2[key]);
      return { key, children, type: NESTED_TYPE };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: UNCHANGED_TYPE };
    }

    return {
      key, value1: data1[key], value2: data2[key], type: UPDATED_TYPE,
    };
  });
};

export default buildTree;
