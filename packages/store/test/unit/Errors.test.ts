import { Errors } from '../..';
import { OperationNotSupportedException } from '@monument/exceptions';

describe('Errors', function() {
  let errors: Errors;

  beforeEach(() => {
    errors = new Errors();
  });

  describe('complete()', function() {
    it('should throw OperationNotSupportedException', function() {
      expect(() => errors.complete()).toThrow(OperationNotSupportedException);
    });
  });

  describe('error()', function() {
    it('should throw OperationNotSupportedException', function() {
      expect(() => errors.error({})).toThrow(OperationNotSupportedException);
    });
  });
});
