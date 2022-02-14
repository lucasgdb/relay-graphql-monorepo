const checkOneError = (errors: Error[], errorCode: string) =>
  errors.some((error) => error.message === errorCode);

export const checkErrorOnArray = (errors: Error[], errorCodes: string[]) =>
  errorCodes.some((errorCode) => checkOneError(errors, errorCode));

export const getError = (errors: Error[], errorCode: string) => {
  return errors.find((error) => checkOneError([error], errorCode));
};
