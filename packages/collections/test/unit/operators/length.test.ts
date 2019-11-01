import { length } from '../../../src/operators/length';

describe('length()', function() {
  it('should calculate count of items in source', function() {
    expect(length([])).toBe(0);
    expect(length([1])).toBe(1);
    expect(length([1, 2])).toBe(2);
  });
});
