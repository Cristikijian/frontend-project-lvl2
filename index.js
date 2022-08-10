const getDiff = (obj1, obj2) => {
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

// eslint-disable-next-line import/prefer-default-export
export { getDiff };
