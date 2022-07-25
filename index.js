import { readFileSync } from 'node:fs';
import path from 'path';

const getPath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

const getFilesContent = (file1, file2) => {
  const data1 = readFileSync(getPath(file1));
  const data2 = readFileSync(getPath(file2));
  return [data1, data2];
};

const getDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const result = Object.entries(obj1)
    .reduce((changes, [key, oldValue]) => {
      if (!Object.hasOwn(obj2, key)) {
        changes.push(`- ${key}: ${oldValue}`);
      }

      const newValue = obj2[key];
      if (Object.hasOwn(obj2, key) && oldValue !== newValue) {
        changes.push(`+ ${key}: ${newValue}`);
        changes.push(`- ${key}: ${oldValue}`);
      }

      if (Object.hasOwn(obj2, key) && oldValue === newValue) {
        changes.push(`${key}: ${oldValue}`);
      }
      return changes;
    }, []);

  return Object.entries(obj2)
    .filter(([key]) => !Object.hasOwn(obj1, key))
    .reduce(
      (changes, [key, newValue]) => {
        changes.push(`+ ${key}: ${newValue}`);
        return changes;
      },
      result,
    );
};

export { getDiff, getFilesContent, getPath };
