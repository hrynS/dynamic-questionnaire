export const replacePlaceholdersInString = (
  str: string,
  regexPlaceholder: RegExp,
  callback: (match: string, key: string) => string,
) => {
  return str.replace(regexPlaceholder, callback);
};
