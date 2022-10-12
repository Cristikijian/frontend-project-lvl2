import plainFormatter from './plain.js';
import formatDiffEntries from './stylish.js';

const format = (output, data) => {
  switch (output) {
    case 'plain':
      return plainFormatter(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      return formatDiffEntries(data);
  }
};
export default format;
