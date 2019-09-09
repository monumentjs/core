import { OperationNotSupportedException } from '@monument/exceptions';
import { Actions } from '../..';

describe('Actions', function() {
  let actions: Actions;

  beforeEach(() => {
    actions = new Actions();
  });

  describe('complete()', function() {
    it('should throw OperationNotSupportedException', function() {
      expect(() => actions.complete()).toThrow(OperationNotSupportedException);
    });
  });

  describe('error()', function() {
    it('should throw OperationNotSupportedException', function() {
      expect(() => actions.error({})).toThrow(OperationNotSupportedException);
    });
  });
});
