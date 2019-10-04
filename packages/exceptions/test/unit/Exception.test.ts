import { Exception } from '../..';

class TestException extends Exception {
}

describe('Exception', function() {
  describe('toString()', function() {
    it('should serialize exception', function() {
      const ex: TestException = new TestException('Oops', new TypeError('fn is not a function'));
      const lines: string = ex.toString();

      expect(lines).toContain('TestException: Oops');
      expect(lines).toContain('Caused by TypeError: fn is not a function');
    });
  });
});
