import get from 'lodash/get';

const checkOneError = (errors, errorCode) =>
  errors.some(error => get(error, 'extensions.code', null) === errorCode) ||
  errors.some(error => error.message === errorCode) ||
  errors.some(error => error.code === errorCode);

export const checkErrorOnArray = (errors, errorCodes) =>
  errorCodes.some(errorCode => checkOneError(errors, errorCode));

export const checkError = (errors, errorCode) => {
  if (Array.isArray(errorCode)) {
    return checkErrorOnArray(errors, errorCode);
  }

  return checkOneError(errors, errorCode);
};

export const getError = (errors, errorCode) =>
  errors.find(error => checkError([error], errorCode));
