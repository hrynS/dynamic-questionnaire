export const replacePlaceholdersInString = (
  str: string,
  regexPlaceholder: RegExp,
  callback: (match: string, key: string) => string,
) => {
  return str.replace(regexPlaceholder, callback);
};

export const isUpperCase = (str: string) => {
  return str === str.toUpperCase();
};

export const capitalizeLetter = (str: string, index = 0) => {
  return str.charAt(index).toUpperCase() + str.slice(1);
};

export const lowercaseLetter = (str: string, index = 0) => {
  return str.charAt(index).toLowerCase() + str.slice(1);
};

export const logError = (error: string) => console.error(error);
