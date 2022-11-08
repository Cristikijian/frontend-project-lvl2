import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const format = (output, data) => {
  switch (output) {
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    case 'stylish':
      return formatStylish(data);
    default:
      throw Error('Unknown format');
  }
};
export default format;
