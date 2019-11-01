import { isSubsetOf } from '../../../src/operators/isSubsetOf';

describe('isSubsetOf()', function() {
  it('should determine whether current set is subset of other set', function() {
    expect(isSubsetOf([], [])).toBe(true);
    expect(isSubsetOf([], [1])).toBe(true);
    expect(isSubsetOf([1], [])).toBe(false);
    expect(isSubsetOf([1, 2], [])).toBe(false);
    expect(isSubsetOf([1, 2, 3], [])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [1])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 4, 5, 6])).toBe(true);

    expect(isSubsetOf([1, 2, 3, 4], [3, 4, 1, 2, 5])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [3, 4, 1, 2, 4])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [3, 4, 1, 2])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 4, 4])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 3, 4])).toBe(true);
    expect(isSubsetOf([1, 2, 3, 4], [1, 2, 3, 3, 4, 4, 1])).toBe(true);

    expect(isSubsetOf([1, 2, 3, 4], [5])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [5, 6])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [5, 6, 7])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [5, 6, 7, 8])).toBe(false);
    expect(isSubsetOf([1, 2, 3, 4], [5, 6, 7, 8, 9])).toBe(false);
  });
});
