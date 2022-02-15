import { checkErrorOnArray, getError } from '../errorHandler';

describe('error handler', () => {
  const errors = new Array(new Error('TEST_CODE'));

  describe('checkErrorOnArray', () => {
    it('should return true when pass correct code', () => {
      const hasError = checkErrorOnArray(errors, ['TEST_CODE']);
      expect(hasError).toBe(true);
    });

    it('should return true when code is present in errors => TEST_CODE', () => {
      const hasError = checkErrorOnArray(errors, [
        'RANDOM_CODE_3',
        'RANDOM_CODE_2',
        'TEST_CODE',
      ]);

      expect(hasError).toBe(true);
    });

    it('should return false when pass code incorrect code', () => {
      const hasError = checkErrorOnArray(errors, ['RANDOM_CODE']);
      expect(hasError).toBe(false);
    });

    it('should return false when code is not present in errors', () => {
      const hasError = checkErrorOnArray(errors, [
        'RANDOM_CODE',
        'RANDOM_CODE_2',
        'RANDOM_CODE_3',
      ]);

      expect(hasError).toBe(false);
    });
  });

  describe('getError', () => {
    it('should return the error when find some code in error', () => {
      const error = getError(errors, 'TEST_CODE');
      expect(error).toMatchObject({ message: 'TEST_CODE' });
    });

    it('should return undefined when not find some code in error', () => {
      const error = getError(errors, 'RANDOM_CODE');
      expect(error).toBeUndefined();
    });
  });
});
