import { isEmpty } from '../../../src/operators/isEmpty';

describe('isEmpty()', function() {
  it('should check whether iterable is empty', function() {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty([1, 2])).toBe(false);
  });
});
