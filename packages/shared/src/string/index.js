const toCamelCase = string =>
  string.replace(/([-_][a-z])/gi, token =>
    token
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

const isArray = array => Array.isArray(array);

const isObject = object =>
  object === Object(object) && !isArray(object) && typeof object !== 'function';

export const snakeToCamel = s => s.replace(/(_\w)/g, c => c[1].toUpperCase());

export const currencyFormat = value => value.toFixed(2).replace('.', ',');

export const convertKeysMiddleware = data => {
  if (data) {
    return Object.keys(data).reduce(
      (previous, key) => ({ ...previous, [snakeToCamel(key)]: data[key] }),
      {},
    );
  }

  return null;
};

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const keysToCamelCase = object => {
  if (isObject(object)) {
    const newObject = {};
    Object.keys(object).forEach(key => {
      newObject[toCamelCase(key)] = keysToCamelCase(object[key]);
    });

    return newObject;
  }

  if (isArray(object)) {
    return object.map(i => keysToCamelCase(i));
  }

  return object;
};
