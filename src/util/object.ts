export const removeAtt = (obj: any, fields: string[]) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (value !== null) if (fields.some(item => key !== item)) return value;
    })
  );
};
